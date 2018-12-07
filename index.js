const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
pool.on('error', (err, client) => {
  console.error('(postgres pooling error) Unexpected error on idle client', err)
  process.exit(-1)
})
// var urlendcodedParser = bodyParser.urlencoded({ extended: false })
const app = express()

const pathPub = path.join(__dirname, 'public')
app.use(express.static(pathPub))
app.use(bodyParser.json())
app.get('/', (req, res) =>
  res.sendFile(path.join(pathPub, 'index.html')))

app.get('/api/top10', (req, res) => {
  pool.query(`SELECT name, score, onDate FROM top10 ORDER BY score DESC LIMIT 10`, (err, result) => {
    if (err) throw err
    res.send(result.rows)
  })
})
app.post('/api/newScore', (req, res) => {
  const currentUser = JSON.parse(JSON.stringify(req.body))
  let { name, score } = currentUser
  name = name || 'Anonymous'
  pool.query(`INSERT into top10 (name , score) values ($1, $2)`, [name, score], (err, result) => {
    if (err) throw err
    res.send(result.rows) // need this empty send! or else client will wait forever
  })
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

// fetch('http://localhost:5000/api/newScore', { 'method': 'post', body: 'something' }, 'thisandthat')
