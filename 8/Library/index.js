const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const Author = require('./schemas/authorSchema')
const Book = require('./schemas/bookSchema')
const User = require('./schemas/userSchema')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
require('dotenv').config()

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.URL
console.log('connecting')
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('big error', error.message)
  })

let token = ''
const typeDefs = gql`
  type Author {
    name: String
    id: ID
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String
    published: Int
    author: Author
    id: ID
    genres: [String]
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: String
  }
  
  type Mutation {
    addBook(
      title: String
      published: Int
      author: String
      genres: [String]
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
    createUser(
        username: String!
        favoriteGenre: String!
      ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author === undefined && args.genre === undefined) {
        return Book.find({}).populate('author', {name: 1, born: 1})
      } else if (args.author !== undefined && args.genre !== undefined) {
        return Book.find({ author: args.author, genres: args.genre }).populate('author', {name: 1, born: 1})
      } else if (args.author) {
        return Book.find({ author: args.author }).populate('author', {name: 1, born: 1})
      } else {
        return Book.find({ genres: args.genre }).populate('author', {name: 1, born: 1})
      }
    },
    allAuthors: () => Author.find({}),
    me: () => token
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: (root) => {
      return Book.find({ author: root.id }).countDocuments()
    }
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres 
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (token === '') {
        return null
      } else if (author === null) {
        const newauthor = new Author({ name: args.author})
        newauthor.save()
        const book = new Book({ title: args.title, author: newauthor.id, published: args.published, genres: args.genres })
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book.save()
      } else {
        console.log(args)
        const book = new Book({ title: args.title, published: args.published, genres: args.genres, author: author.id })
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book.save()
      }
    },
    editAuthor: async (root, args) => {
      if (token === '') {
        return null
      } else {
        const author = await Author.findOneAndUpdate({ name: args.name }, {born: args.setBornTo}, {new: true})
        if (author === null){
          return null
        } else {
          return author
        }
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '69') {
        throw new UserInputError('Wrong creds')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
        favoriteGenre: user.favoriteGenre
      }
      token = jwt.sign(userForToken, JWT_SECRET)
      return { value: token }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}
async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: '/'
  })
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          }
        }
      }
    }]
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}
startApolloServer(typeDefs, resolvers)