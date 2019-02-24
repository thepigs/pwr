
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const agg = require('./db')
const app = express()
const moment = require('moment')
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

app.get('/power/avg/5min', (req, res) => {
  let s 
  let e = moment(req.query.e)
  if (req.query.d && req.query.u){
    s=moment(e)
    s.subtract(req.query.d,req.query.u)
  } else s = moment(req.query.s)
  agg(s.toDate(),e.toDate()).then(data=>res.json(data))
  
})

app.listen(process.env.PORT || 8081)