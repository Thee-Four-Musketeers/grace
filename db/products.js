const client = require('./client');

async function createProduct({ name, description, price, type, imageUrl, origin, hardness, odor }){
    try {
        const { rows: [product]  } = await client.query(`
            INSERT INTO products (name, description, price, type, "imageUrl", origin, hardness, odor)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
        `,[name, description, price, type, imageUrl, origin, hardness, odor]);
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


async function getProductsByTypes(types){
    try {
        const {rows: product } = await client.query(`
            SELECT *
            FROM products
            WHERE type = ANY($1::choice[])
        `, [types])
        return product
    } catch (error){
    throw error }
}


async function getProductsByType(type){
    try {
        const {rows: product } = await client.query(`
            SELECT *
            FROM products
            WHERE type = $1;
        `, [type])
        return product
    } catch (error){
    throw error }
}

async function updateProduct(id, fields = {}){
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
      try {
         const {rows: prodcut } = await client.query(`
         UPDATE products
         SET ${ setString }
         WHERE id=${ id }
         RETURNING *;
         `, Object.values(fields))
         return product
      } catch (error) {
          throw error
      }
}

async function deleteProduct(id){
    try {
        const {rows: product} = await client.query(`
        DELETE from products
        WHERE id=${id}
        RETURNING *;
        `, [id])
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByType,
    getProductsByTypes,
    updateProduct,
    deleteProduct
}