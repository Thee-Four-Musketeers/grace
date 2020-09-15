// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS orders_cheeses;
      DROP TABLE IF EXISTS users_payments;
      DROP TABLE IF EXISTS users_orders;
      DROP TABLE IF EXISTS users_addresses;
      DROP TABLE IF EXISTS cheeses;
      DROP TABLE IF EXISTS payments;
      DROP TABLE IF EXISTS addresses;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
    `)

    // build tables in correct order
    await client.query(`
      CREATE TABLE cheeses (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) UNIQUE NOT NULL,
        origin VARCHAR (255),
        description TEXT,
        price NUMERIC (6, 2),
        hardness VARCHAR (255),
        odor VARCHAR (255)
      );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR (255),
        "lastName" VARCHAR (255),
      );
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        quantity INTEGER,
        urgency VARCHAR (255),
      );
      CREATE TABLE addresses (
        id SERIAL KEY,
        "houseNumber" INTEGER,
        "streetName" VARCHAR (255),
        city VARCHAR (255),
        state VARCHAR (255),
        zipcode INTEGER
      );
      CREATE TABLE payments (
        id SERIAL KEY,
        "paymentType" VARCHAR (255),
        ADD CONSTRAINT "paymentType" CHECK ("paymentType" = "VISA" or "paymentType" = "MasterCard" or "paymentType" = "American Express"),
        "cardNumber" INTEGER,
        "cardExpiration" DATE,
        cvv INTEGER
      );
      CREATE TABLE users_addresses (
        id SERIAL PRIMARY KEY,
        "usersId" INTEGER REFERENCES users(id),
        "addressesId" INTEGER REFERENCES addresses(id)
      );   
      CREATE TABLE users_orders (
        id SERIAL PRIMARY KEY,
        "usersId" INTEGER REFERENCES users(id),
        "ordersId" INTEGER REFERENCES orders(id)
      );  
      CREATE TABLE users_payments (
        id SERIAL PRIMARY KEY,
        "usersId" INTEGER REFERENCES users(id),
        "paymentsId" INTEGER REFERENCES payments(id)
      );  
      CREATE TABLE orders_cheeses (
        id SERIAL PRIMARY KEY,
        "ordersId" INTEGER REFERENCES orders(id),
        "cheesesId" INTEGER REFERENCES cheeses(id)
      );  
    `)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());