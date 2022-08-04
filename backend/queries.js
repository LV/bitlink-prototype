const Pool = require("pg").Pool;
const pool = new Pool({
  user: "dbadmin",
  host: "localhost",
  database: "bitlinkdb",
  password: "bitlink304",
  port: 5432,
});

/*
GET Requests
*/
const getWallets = (request, response) => {
  pool.query(
    "SELECT * FROM Wallet ORDER BY wallet_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCustomers = (request, response) => {
  pool.query(
    "SELECT * FROM Customer ORDER BY customer_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getMerchants = (request, response) => {
  pool.query(
    "SELECT * FROM Merchant ORDER BY merchant_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getOrders = (request, response) => {
  pool.query(
    "SELECT * FROM OrderDetails ORDER BY order_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

/*
POST Requests
*/

const createWallet = (request, response) => {
  const { btc_amount } = request.body;

  pool.query(
    "INSERT INTO Wallet(btc_amount) VALUES ($1) RETURNING *;",
    [btc_amount],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response
        .status(201)
        .send(`Wallet added with amount: ${results.rows[0].btc_amount}`);
    }
  );
};

const createCustomer = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO Customer(name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response
        .status(201)
        .send(
          `Customer created with name: ${results.rows[0].name} and ${results.rows[0].email} assigned to ${results.rows[0].wallet_id}`
        );
    }
  );
};

const createMerchant = (request, response) => {
  const { bank_account_number, name, usd_owed } = request.body;

  pool.query(
    "INSERT INTO Merchant(bank_account_number, name, usd_owed) VALUES ($1, $2, $3) RETURNING *",
    [bank_account_number, name, usd_owed],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response
        .status(201)
        .send(
          `Merchant created with name: ${results.rows[0].name} and ${results.rows[0].bank_account_number} with a balance owed of $${results.rows[0].usd_owed}`
        );
    }
  );
};

const createOrder = (request, response) => {
  const {
    customer_id,
    company_account_number,
    merchant_id,
    wallet_id,
    datetime,
    fee_percentage,
  } = request.body;

  pool.query(
    "INSERT INTO OrderDetails (customer_id, company_account_number, merchant_id, wallet_id, datetime, fee_percentage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      customer_id,
      company_account_number,
      merchant_id,
      wallet_id,
      datetime,
      fee_percentage,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Order created`);
    }
  );
};

module.exports = {
  getWallets,
  createWallet,
  getCustomers,
  createCustomer,
  getMerchants,
  createMerchant,
  getOrders,
  createOrder
};
