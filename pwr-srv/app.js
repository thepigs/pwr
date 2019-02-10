
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const agg = require('./db')
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.get('/power', (req, res) => {
  agg().then(data=>res.json(data))
  
})

app.listen(process.env.PORT || 8081)