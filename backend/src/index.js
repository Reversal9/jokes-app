const express = require('express')
const { PrismaClient } = require('../generated/prisma/client')

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello!')
})

const url = 'https://sv443.net/jokeapi/v2/joke/Any'

const getJoke = async () => {
  const response = await fetch(url)

  let data = await response.json()

  if (data.hasOwnProperty('joke')) {
    data = {
      type: 'joke',
      joke: data.joke
    }
  } else {
    data = {
      type: 'setup',
      setup: data.setup,
      delivery: data.delivery
    }
  }

  return data
}

app.get('/joke', async (req, res) => {

  const data = await getJoke()

  res.send({
    statusCode: 200,
    body: data
  })
})

app.post('/log', async (req, res) => {
  // try {
  const joke = await getJoke()

  let addedJoke

  if (joke.hasOwnProperty('joke')) {
    addedJoke = await prisma.joke.create({
      data: {
        type: 'joke',
        joke: joke.joke,
        timestamp: new Date()
      }
    })
  } else {
    addedJoke = await prisma.joke.create({
      data: {
        type: 'setup',
        setup: joke.setup,
        delivery: joke.delivery,
        timestamp: new Date()
      }
    })
  }

  res.send({
    statusCode: 200,
    body: addedJoke
  })
  // } catch (err) {
  // res.send(err)
  // }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
