/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./modules/person')
var morgan = require('morgan')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('person', function (req, res) { return undefined })
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :person')
app.use(logger)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.get('/api/persons', (req, res) => {
  morgan.token('person', function (req, res) { return undefined })
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res, next) => {
  morgan.token('person', function (req, res) { return undefined })
  Person.find({}).then(persons => {
    res.send(`<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${Date()}</p>
      </div>`)
  })
    .catch(error => next(error))

})
app.get('/api/persons/:id', (req, res, next) => {
  morgan.token('person', function (req, res) { return undefined })
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  morgan.token('person', function (req, res) { return undefined })
  Person.findByIdAndDelete(req.params.id).
    then(res => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  } else if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
      morgan.token('person', function (req, res) { return JSON.stringify(person) })
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/', (req, res) => {
  res.send('build/index.html')
})
app.use(unknownEndpoint)
app.use(errorHandler)
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})