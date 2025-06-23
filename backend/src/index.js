const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello!')
})

const url = 'https://sv443.net/jokeapi/v2/joke/'

app.get('/joke', await(req, res) => {
  const response = await fetch(url)

  const data = await response.json()

  res.send({
    statusCode: 200,
    body: data.data
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
