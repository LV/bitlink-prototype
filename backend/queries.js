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

const getWallet = (request, response) => {
  const wallet_id = parseInt(request.params.id)

  pool.query('SELECT * FROM Wallet WHERE wallet_id = $1', [wallet_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

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

const getLineItems = (request, response) => {
  pool.query(
    "SELECT * FROM LineItem ORDER BY order_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


/*
PUT Requests
*/

const updateWallet = (request, response) => {
  const wallet_id = parseInt(request.params.id)
  const { btc_amount } = request.body

  pool.query(
    'UPDATE Wallet SET btc_amount = $1 WHERE wallet_id = $2',
    [btc_amount, wallet_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Wallet balance updated to ${btc_amount} with ID: ${wallet_id}`)
    }
  )
}

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

const createLineItem = (
  order_id,
  item_brand,
  item_name,
  item_usd_price,
  item_quantity
) => {
  pool.query(
    "INSERT INTO LineItem (order_id, item_brand, item_name, item_usd_price, item_quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      order_id,
      item_brand,
      item_name,
      item_usd_price,
      item_quantity
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
}

/*
POST to http://localhost:8080/order with body of
{
    "customer_id" : 1,
    "company_account_number" : 1000000001,
    "merchant_id" : 1,
    "wallet_id" : 1,
    "datetime" : "2022-07-31",
    "fee_percentage" : 0.02,
    "items" : [
        {
            "item_name": "Scarf",
            "item_brand": "Zara",
            "item_usd_price": 30,
            "item_quantity": 2
        }
    ]
}
*/
const createOrder = (request, response) => {
  const {
    customer_id,
    company_account_number,
    merchant_id,
    wallet_id,
    datetime,
    fee_percentage,
    items
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
      console.log(results.rows[0])

      items.forEach((item) => createLineItem(results.rows[0].order_id,
        item.item_brand,
        item.item_name,
        item.item_usd_price,
        item.item_quantity)
      )

      response
        .status(201)
        .send(`Order created`);
    }
  );
};

/*
DELETE Requests
*/

const deleteOrder = (request, response) => {
  const order_id = parseInt(request.params.id)

  pool.query('DELETE FROM OrderDetails WHERE order_id = $1', [order_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Order deleted with ID: ${order_id}`)
  })
}

module.exports = {
  getWallets,
  getWallet,
  updateWallet,
  createWallet,
  getCustomers,
  createCustomer,
  getMerchants,
  createMerchant,
  getOrders,
  createOrder,
  deleteOrder,
  getLineItems
};
