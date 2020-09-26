const client = require('./client');

//creates order when checking out
async function createOrder({ customer, status, subtotal, tax, discount, loyalty, largeOrder, shipping, total, urgency }) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO products (customer, status, subtotal, tax, discount, loyalty, "largeOrder", shipping, total, urgency)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (customer) DO NOTHING 
            RETURNING *;
        `, [customer, status, subtotal, tax, discount, loyalty, largeOrder, shipping, total, urgency]);
        return order;
    } catch (error) {
        throw error
    }
}

//creates cart for logged in user
//need to create alternate for storing in local storage
async function createCart({ productId, orderId, productIdQuantity }) {
    try {
        const { rows: [cart] } = await client.query(`
        INSERT INTO orders_products ("productId", "orderId", "productIdQuantity")
            VALUES ($1, $2, $3)
            ON CONFLICT ("productId") DO NOTHING 
            RETURNING *;
        `, [productId, orderId, productIdQuantity]);
        return cart;
    } catch (error) {
        throw error
    }
}

//recalls cart when user logs back in
async function getCartById(id) {
    try {
        const { rows: cart } = await client.query(`
        SELECT *
        FROM orders_products
        WHERE id = $1;
        `, [id])
        return cart
    } catch (error) {
        throw error
    }
}

//for user to pull up all orders on user account, checks with user ID
async function getOrders(customer) {
    try {
        const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE customer = $1;
        `, [customer])
        return orders
    } catch (error) {
        throw error
    }
}


module.exports = {
    createOrder,
    createCart,
    getCartById,
    getOrders
}