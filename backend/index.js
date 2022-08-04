const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/wallet', db.getWallets)
app.post('/wallet', db.createWallet)
app.get('/customer', db.getCustomers)
app.post('/customer', db.createCustomer)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})  
