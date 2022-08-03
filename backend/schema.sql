CREATE TABLE Wallet(
    wallet_id SERIAL PRIMARY KEY,
    btc_amount DECIMAL DEFAULT 0
);

CREATE TABLE Withdrawal(
    transaction_id SERIAL PRIMARY KEY,
    customer_btc_address TEXT NOT NULL,
    btc_to_withdraw DECIMAL NOT NULL
);

CREATE TABLE Deposit(
    transaction_id SERIAL PRIMARY KEY,
    bitlink_btc_address TEXT NOT NULL
);

CREATE TABLE Transaction(
    transaction_id SERIAL PRIMARY KEY,
    wallet_id INTEGER NOT NULL,
    FOREIGN KEY (wallet_id) REFERENCES Wallet(wallet_id)
);

CREATE TABLE Customer(
    customer_id SERIAL PRIMARY KEY,
    wallet_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (wallet_id) REFERENCES Wallet(wallet_id),
    UNIQUE (wallet_id)
);

CREATE TABLE MerchantBankAccount(
    account_number INTEGER,
    routing_number INTEGER,
    PRIMARY KEY (account_number, routing_number),
    UNIQUE(account_number),
    UNIQUE(routing_number)
);

CREATE TABLE Merchant(
    merchant_id SERIAL PRIMARY KEY,
    bank_account_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    usd_owed DECIMAL DEFAULT 0,
    FOREIGN KEY (bank_account_number) REFERENCES MerchantBankAccount(account_number)
);

CREATE TABLE CompanyAccount(
    account_number INTEGER PRIMARY KEY,
    usd_balance DECIMAL DEFAULT 0,
    btc_balance DECIMAL DEFAULT 0
);

CREATE TABLE OrderDetails(
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    company_account_number INTEGER NOT NULL,
    merchant_id INTEGER NOT NULL,
    wallet_id INTEGER NOT NULL,
    datetime DATE NOT NULL DEFAULT CURRENT_DATE,
    fee_percentage DECIMAL NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (company_account_number) REFERENCES CompanyAccount(account_number),
    FOREIGN KEY (merchant_id) REFERENCES Merchant(merchant_id),
    FOREIGN KEY (wallet_id) REFERENCES Wallet(wallet_id)
);

CREATE TABLE Subscription(
    order_id SERIAL PRIMARY KEY,
    conversion_rate DECIMAL NOT NULL,
    charge_usd_price DECIMAL NOT NULL,
    billing_frequency TEXT NOT NULL,
    billing_duration TEXT NOT NULL
);

CREATE TABLE OnetimePurchase(
    order_id SERIAL PRIMARY KEY,
    conversion_rate DECIMAL NOT NULL,
    total_usd_price DECIMAL NOT NULL
);

CREATE TABLE LineItemType(
    order_id INTEGER,
    item_name TEXT NOT NULL,
    item_type TEXT NOT NULL,
    PRIMARY KEY (order_id, item_name),
    FOREIGN KEY (order_id) REFERENCES OrderDetails(order_id),
    UNIQUE(item_name)
);

CREATE TABLE LineItem(
    order_id INTEGER,
    item_brand TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_usd_price DECIMAL DEFAULT 0,
    item_quantity INTEGER DEFAULT 1,
    PRIMARY KEY(order_id, item_brand, item_name),
    FOREIGN KEY (order_id) REFERENCES OrderDetails(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (item_name) REFERENCES LineItemType(item_name)
);
