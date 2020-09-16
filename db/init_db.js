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
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) UNIQUE NOT NULL,
        type VARCHAR (255),
        ADD CONSTRAINT type CHECK (type = "Cheese" or type = "Meat" or type = "Fruit" or type = "Pre-Made Board"),
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
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255),
        "houseNumber" INTEGER,
        "streetName" VARCHAR (255),
        city VARCHAR (255),
        state VARCHAR (255),
        zipcode INTEGER,
        admin BOOLEAN,
      );
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user VARCHAR (255) REFERENCES users (email),
        item VARCHAR (255) REFERENCES products (name),
        quantity INTEGER,
        subtotal NUMERIC (6, 2),
        modifier1 NUMERIC (3, 2),
        modifier2 NUMERIC (3, 2),
        modifier3 NUMERIC (3, 2),
        modifier4 NUMERIC (3, 2),
        shipping NUMERIC (5, 2),
        handling NUMERIC (5, 2),
        total Numeric (6, 2),
        urgency VARCHAR (255)
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