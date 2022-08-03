const Pool = require('pg').Pool
const pool = new Pool({
    user: 'dbadmin',
    host: 'localhost',
    database: 'bitlinkdb',
    password: 'bitlink304',
    port: 5432,
})

const getInternalEWallet = (request, response) => {
    pool.query('SELECT * FROM InternalEWallet ORDER BY wallet_id ASC;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

module.exports = {
    getInternalEWallet
}