const client = require('./client');

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

async function getProductsByType(type){
    try{
        const {rows: product } = await client.query(`
        SELECT *
        FROM products
        WHERE type = $1;
        `, [type])
        return product
    } catch (error){
    throw error }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByType
  }