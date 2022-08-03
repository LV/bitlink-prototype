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

/*
POST Requests
*/

const createWallet = (request, response) => {
    const { btcAmount } = request.body

    pool.query('INSERT INTO Wallet(btc_amount) VALUES ($1) RETURNING *;', [btcAmount], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(201).send(`Wallet added with amount: ${results.rows[0].btc_amount}`)
    })
}

const createOrder = (request, response) => {
    const { customerId, companyAccountNumber, merchantId, walletId, datetime, feePercentage } = request.body

    pool.query('INSERT INTO OrderDetails (customer_id, company_account_number, merchant_id, wallet_id, datetime, fee_percentage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [customerId, companyAccountNumber, merchantId, walletId, datetime, feePercentage], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].customerId}`)
    })
}

module.exports = {
    getWallets,
    createWallet
}
