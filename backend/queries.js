const Pool = require('pg').Pool
const pool = new Pool({
    user: 'dbadmin',
    host: 'localhost',
    database: 'bitlinkdb',
    password: 'bitlink304',
    port: 5432,
})

/*
GET Requests
*/
const getWallets = (request, response) => {
    pool.query('SELECT * FROM Wallet ORDER BY wallet_id ASC;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM Customer ORDER BY customer_id ASC;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/*
POST Requests
*/

const createWallet = (request, response) => {
    const { btc_amount } = request.body

    pool.query('INSERT INTO Wallet(btc_amount) VALUES ($1) RETURNING *;', [btc_amount], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(201).send(`Wallet added with amount: ${results.rows[0].btc_amount}`)
    })
}

const createCustomer = (request, response) => {
    const { wallet_id, name, email } = request.body

    pool.query('INSERT INTO Customer(wallet_id, name, email) VALUES (DEFAULT, $1, $2) RETURNING *;', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(201).send(`Customer created with name: ${results.rows[0].name} and ${results.rows[0].email} assigned to ${results.rows[0].wallet_id}`)
    })
}

const createOrder = (request, response) => {
    const { customer_id, companyAccountNumber, merchantId, wallet_id, datetime, feePercentage } = request.body

    pool.query('INSERT INTO OrderDetails (customer_id, company_account_number, merchant_id, wallet_id, datetime, fee_percentage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [customer_id, companyAccountNumber, merchantId, wallet_id, datetime, feePercentage], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].customer_id}`)
    })
}

module.exports = {
    getWallets,
    createWallet,
    getCustomers,
    createCustomer
}
