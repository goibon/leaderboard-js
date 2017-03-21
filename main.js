const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const sass = require('node-sass-middleware')
const PORT = process.env.PORT || 3000
const MONGODB_PATH = process.env.MONGODB_PATH || 'mongodb://localhost:27017/leaderboard'

const db = require('./app/databaseHandler')(MONGODB_PATH)

// To support JSON-encoded bodies
app.use(bodyParser.json())

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function (request, response) {
  db.getAllEntries().then((documents) => {
    // Sort entries by score, highest to lowest
    documents.sort((a, b) => {
      return b.score - a.score
    })
    response.render('index', {entries: documents})
  })
  .catch(() => {
    response.status(500)
    response.send()
  })
})

app.get('/scores', (request, response) => {
  db.getAllEntries().then((documents) => {
    response.json(documents)
    response.send()
  })
  .catch(() => {
    response.status(500)
    response.send()
  })
})

app.post('/scores', function (request, response) {
  console.log(request.body)
  var body = request.body
  if (!body.score && body.score !== 0) {
    response.status(400)
    response.send()
    return
  }
  // Don't allow id's in post
  if (body.hasOwnProperty('_id')) {
    delete body._id
  }

  body.name = (body.name) ? body.name : 'Anonymous'
  body.Timestamp = (body.timestamp) ? body.timestamp : new Date()

  db.saveEntry(body).then((entry) => {
    response.json(entry)
    response.status(204)
  }).catch(() => {
    response.status(500)
    response.send()
  })
})

app.use(sass({
    /* Options */
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed'
}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.listen(PORT, function () {
  console.log(`leaderboard-js app listening on port ${PORT}!`)
})
