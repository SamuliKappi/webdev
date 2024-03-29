/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://phonebookadmin:${password}@cluster0.tk2pg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)
if ( process.argv.length === 3){
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log('worked?')
    mongoose.connection.close()
  })
}
