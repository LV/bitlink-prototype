const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/internalewallet', db.getInternalEWallet)
app.post('/internalewallet', db.createInternalEWallet)
app.post('/customer', db.createCustomer)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})  
