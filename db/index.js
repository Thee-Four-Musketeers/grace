// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/grace';
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

async function createUser({username, password}){
    try {
        const { rows: [user]  } = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
        `,[username, password]);
        return user;
    } catch (error) {
        throw error
    }
}

async function createProduct({ name, description, price, type }){
    try {
        const { rows: [product]  } = await client.query(`
            INSERT INTO products (name, description, price, type)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
        `,[name, description, price, type]);
        return product;
    } catch (error) {
        throw error
    }
}

// export
module.exports = {
  client,
  createUser,
  createProduct
}