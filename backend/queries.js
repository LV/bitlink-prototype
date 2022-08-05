const { query } = require("express");

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
  const wallet_id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM Wallet WHERE wallet_id = $1",
    [wallet_id],
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

const getCustomerById = (request, response) => {
  const customer_id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM Customer WHERE customer_id = $1",
    [customer_id],
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

const getMerchantById = (request, response) => {
  const merchant_id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM Merchant WHERE merchant_id = $1",
    [merchant_id],
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
GET
http://localhost:8080/orderProj/
{
    "order_id": true,
    "customer_id": false,
    "company_account_number": true,
    "merchant_id": true,
    "wallet_id": true,
    "datetime": true,
    "fee_percentage": true
}
*/

const getOrdersProjection = (request, response) => {
  const {
    order_id,
    customer_id,
    company_account_number,
    merchant_id,
    wallet_id,
    datetime,
    fee_percentage
  } = request.body;

  var selectString = "SELECT "
  const attributes = []
  if (order_id) {
    attributes.push("order_id")
  }
  if (customer_id) {
    attributes.push("customer_id")
  }
  if (company_account_number) {
    attributes.push("company_account_number")
  }
  if (merchant_id) {
    attributes.push("merchant_id")
  }
  if (wallet_id) {
    attributes.push("wallet_id")
  }
  if (datetime) {
    attributes.push("datetime")
  }
  if (fee_percentage) {
    attributes.push("fee_percentage")
  }

  const attributesString = attributes.join(', ');
  const fromTableString = " FROM OrderDetails;"
  const query = selectString + attributesString + fromTableString

  pool.query(query,
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

const getOnetimePurchase = (request, response) => {
  pool.query(
    "SELECT * FROM OnetimePurchase ORDER BY order_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getSubscription = (request, response) => {
  pool.query(
    "SELECT * FROM Subscription ORDER BY order_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

/*
GET http://localhost:8080/purchaseSelection/
{
    "subscription" : {
      "order_id" : true,
      "conversion_rate" : true,
      "charge_usd_price" : true,
      "billing_frequency" : true,
      "billing_duration" : true
    }
}

{
    "otp" : {
      "order_id" : true,
      "conversion_rate" : true,
      "total_usd_price" : true
    }
}
*/

const getPurchaseSelection = (request, response) => {
  const {
    otp,
    subscription
  } = request.body;

  var selectString = "SELECT "
  const attributes = []
  var fromTableString = ""
  if (otp != null) {
    if (otp.order_id) {
      attributes.push("order_id")
    }
    if (otp.conversion_rate) {
      attributes.push("conversion_rate")
    }
    if (otp.total_usd_price) {
      attributes.push("total_usd_price")
    }
    fromTableString = " FROM OnetimePurchase"
  }

  if (subscription != null) {
    if (subscription.order_id) {
      attributes.push("order_id")
    }
    if (subscription.conversion_rate) {
      attributes.push("conversion_rate")
    }
    if (subscription.charge_usd_price) {
      attributes.push("charge_usd_price")
    }
    if (subscription.billing_frequency) {
      attributes.push("billing_frequency")
    }
    if (subscription.billing_duration) {
      attributes.push("billing_duration")
    }
    fromTableString = " FROM Subscription"
  }
  const attributesString = attributes.join(', ');
  const query = selectString + attributesString + fromTableString

  pool.query(query,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getTransactions = (request, response) => {
  pool.query(
    "SELECT * FROM Transaction ORDER BY transaction_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getDeposits = (request, response) => {
  pool.query(
    "SELECT * FROM Deposit ORDER BY transaction_id ASC;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getWithdrawals = (request, response) => {
  pool.query(
    "SELECT * FROM Withdrawal ORDER BY transaction_id ASC;",
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
  const wallet_id = parseInt(request.params.id);
  const { btc_amount } = request.body;

  pool.query(
    "UPDATE Wallet SET btc_amount = $1 WHERE wallet_id = $2",
    [btc_amount, wallet_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Wallet balance updated to ${btc_amount} with ID: ${wallet_id}`);
    }
  );
};

const updateCustomer = (request, response) => {
  const customer_id = parseInt(request.params.id);
  const { name, email } = request.body;
  console.log(name, email);

  var query = "UPDATE Customer"
  if (name != null) {
    query += ` SET name = '${name}'`
  }

  if (email != null) {
    query += `, email = '${email}' `
  }

  query += `WHERE customer_id = ${customer_id}`

  console.log(query)

  pool.query(query,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Customer details updated`);
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
    [order_id, item_brand, item_name, item_usd_price, item_quantity],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

const createOTP = (order_id, conversion_rate, total_usd_price) => {
  pool.query(
    "INSERT INTO OnetimePurchase (order_id, conversion_rate, total_usd_price) VALUES ($1, $2, $3) RETURNING *",
    [order_id, conversion_rate, total_usd_price],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

const createSubscription = (
  order_id,
  conversion_rate,
  charge_usd_price,
  billing_frequency,
  billing_duration
) => {
  pool.query(
    "INSERT INTO Subscription (order_id, conversion_rate, charge_usd_price, billing_frequency, billing_duration) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      order_id,
      conversion_rate,
      charge_usd_price,
      billing_frequency,
      billing_duration,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

/*
Update other relations helpers
*/

// btc_adjustment is a float
// where positive values increments the current wallet balance and
// negative values decrement the current wallet balance
const updateWalletDb = (btc_adjustment, wallet_id) => {
  pool.query(
    "SELECT * FROM Wallet WHERE wallet_id = $1",
    [wallet_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "UPDATE Wallet SET btc_amount = $1 WHERE wallet_id = $2",
        [parseFloat(results.rows[0].btc_amount) + btc_adjustment, wallet_id],
        (error, results) => {
          if (error) {
            throw error;
          }
        }
      );
    }
  );
};

const updateCompanyAccount = (btc_adjustment, account_number) => {
  pool.query(
    "SELECT * FROM CompanyAccount WHERE account_number = $1",
    [account_number],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "UPDATE CompanyAccount SET btc_balance = $1 WHERE account_number = $2",
        [
          parseFloat(results.rows[0].btc_balance) + btc_adjustment,
          account_number,
        ],
        (error, results) => {
          if (error) {
            throw error;
          }
        }
      );
    }
  );
};

const updateMerchant = (usd_adjustment, merchant_id) => {
  pool.query(
    "SELECT * FROM Merchant WHERE merchant_id = $1",
    [merchant_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "UPDATE Merchant SET usd_owed = $1 WHERE merchant_id = $2",
        [parseFloat(results.rows[0].usd_owed) + usd_adjustment, merchant_id],
        (error, results) => {
          if (error) {
            throw error;
          }
        }
      );
    }
  );
};

/*
POST to http://localhost:8080/order 

OTP body
{
    "customer_id" : 1,
    "company_account_number" : 1000000001,
    "merchant_id" : 1,
    "wallet_id" : 1,
    "datetime" : "2022-07-31",
    "fee_percentage" : 0.02,
    "otp" : 
        [
            {
                "item_name": "Scarf",
                "item_brand": "Zara",
                "item_usd_price": 30,
                "item_quantity": 2
            }
        ],
    "subscription" : {}
}

Subscription body
{
    "customer_id" : 1,
    "company_account_number" : 1000000001,
    "merchant_id" : 1,
    "wallet_id" : 1,
    "datetime" : "2022-07-31",
    "fee_percentage" : 0.02,
    "otp" : [],
    "subscription" : {
        "item_name": "Two Month Subscription",
        "item_brand": "Netflix",
        "item_usd_price": 15,
        "item_quantity": 1,
        "billing_frequency" : "monthly",
        "billing_duration" : 2
    }
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
    otp,
    subscription,
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
      console.log(results.rows[0]);

      if (JSON.stringify(subscription) === "{}") {
        // Create LineItem entries
        otp.forEach((item) =>
          createLineItem(
            results.rows[0].order_id,
            item.item_brand,
            item.item_name,
            item.item_usd_price,
            item.item_quantity
          )
        );
        // Create single OnetimePurchase entry
        var totalPrice = 0.0;
        otp.forEach((item) => (totalPrice += item.item_usd_price));
        createOTP(results.rows[0].order_id, Math.random(), totalPrice);

        // Update customer wallet balance
        updateWalletDb(-(convRate * totalPrice), wallet_id);
        // Update company account with our fee
        updateCompanyAccount(
          -(convRate * totalPrice * fee_percentage),
          company_account_number
        );
        // Update Merchant account usd owed balance
        updateMerchant(totalPrice * (1 - fee_percentage), merchant_id);
      } else {
        const convRate = Math.random();

        createLineItem(
          results.rows[0].order_id,
          subscription.item_brand,
          subscription.item_name,
          subscription.item_usd_price,
          subscription.item_quantity
        );

        createSubscription(
          results.rows[0].order_id,
          convRate,
          subscription.item_usd_price,
          subscription.billing_frequency,
          subscription.billing_duration
        );

        // Update customer wallet balance
        updateWalletDb(-(convRate * subscription.item_usd_price), wallet_id);
        // Update company account with our fee
        updateCompanyAccount(
          -(convRate * subscription.item_usd_price * fee_percentage),
          company_account_number
        );
        // Update Merchant account usd owed balance
        updateMerchant(
          subscription.item_usd_price * (1 - fee_percentage),
          merchant_id
        );
      }

      response.status(201).send(`Order created`);
    }
  );
};

const createDeposit = (transaction_id, bitlink_btc_address, btc_to_deposit) => {
  pool.query(
    "INSERT INTO Deposit (transaction_id, bitlink_btc_address, btc_to_deposit) VALUES ($1, $2, $3) RETURNING *",
    [transaction_id, bitlink_btc_address, btc_to_deposit],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

/*
http://localhost:8080/deposit
{
    "wallet_id" : 1,
    "bitlink_btc_address" : "ASDQWDWQD",
    "btc_to_deposit" : 30
}
*/

const createDepositTransaction = (request, response) => {
  const { wallet_id, bitlink_btc_address, btc_to_deposit } = request.body;

  pool.query(
    "INSERT INTO Transaction (wallet_id) VALUES ($1) RETURNING *",
    [wallet_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      createDeposit(
        results.rows[0].transaction_id,
        bitlink_btc_address,
        btc_to_deposit
      );

      // Update customer wallet balance
      updateWalletDb(btc_to_deposit, wallet_id);

      response.status(201).send(`Deposit created`);
    }
  );
};

const createWithdrawal = (
  transaction_id,
  customer_btc_address,
  btc_to_withdraw
) => {
  pool.query(
    "INSERT INTO Withdrawal (transaction_id, customer_btc_address, btc_to_withdraw) VALUES ($1, $2, $3) RETURNING *",
    [transaction_id, customer_btc_address, btc_to_withdraw],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

/*
http://localhost:8080/withdrawal
{
    "wallet_id" : 1,
    "customer_btc_address" : "QWDNQWEQWE",
    "btc_to_withdraw" : 30
}
*/

const createWithdrawalTransaction = (request, response) => {
  const { wallet_id, customer_btc_address, btc_to_withdraw } = request.body;

  pool.query(
    "INSERT INTO Transaction (wallet_id) VALUES ($1) RETURNING *",
    [wallet_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      createWithdrawal(
        results.rows[0].transaction_id,
        customer_btc_address,
        btc_to_withdraw
      );

      // Update customer wallet balance
      updateWalletDb(-btc_to_withdraw, wallet_id);

      response.status(201).send(`Withdrawal created`);
    }
  );
};

/*
DELETE Requests
*/

const deleteOrder = (request, response) => {
  const order_id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM OrderDetails WHERE order_id = $1",
    [order_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "DELETE FROM OnetimePurchase WHERE order_id = $1",
        [order_id],
        (error, results) => { }
      );
      pool.query(
        "DELETE FROM Subscription WHERE order_id = $1",
        [order_id],
        (error, results) => { }
      );

      response.status(200).send(`Order deleted with ID: ${order_id}`);
    }
  );
};

module.exports = {
  getWallets,
  getWallet,
  updateWallet,
  createWallet,
  getCustomers,
  updateCustomer,
  getCustomerById,
  createCustomer,
  getMerchants,
  getMerchantById,
  createMerchant,
  getOrders,
  getOrdersProjection,
  createOrder,
  deleteOrder,
  getLineItems,
  getOnetimePurchase,
  getSubscription,
  getPurchaseSelection,
  getTransactions,
  getDeposits,
  getWithdrawals,
  createDepositTransaction,
  createWithdrawalTransaction,
};
