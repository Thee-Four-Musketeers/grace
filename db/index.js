// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/grace';
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods


async function getUsers(){
    try {
        const { rows: [user] } = await client.query(`
        SELECT * 
        FROM users;`);

        return user

    } catch (error) {
        throw error
    }
}

async function getUserById(id){
    try {
        const { rows: [user] } = await client.query(`
        SELECT * 
        FROM users
        WHERE id = $1;`, [id])

        if (!user || user.length === 0) {
            return null;
        }

        return user

    } catch (error) {
        throw error 
    }
}

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


async function getProducts(){
    try {
        const  {rows: products } = await client.query(`
        SELECT * 
        FROM products;
        `);

        return products
        
    } catch (error) {
        throw error
    }
}

async function getProductById(id){
    try {
        const {rows: product } = await client.query(`
        SELECT *
        FROM products
        WHERE id = $1;`
        , [id])

        if (!product || product.length === 0) {
            return null;
        }

        return product

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
  createProduct,
  getUsers,
  getUserById,
  getProducts,
  getProductById
}