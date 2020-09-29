 const client = require('./client');

// creates order when checking out
// this should be invoked when a successful payment was received

async function createOrder({ customer, status, subtotal, tax, discount, loyalty, largeOrder, shipping, total, urgency }) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders (customer, status, subtotal, tax, discount, loyalty, "largeOrder", shipping, total, urgency)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (customer) DO NOTHING 
            RETURNING *;
        `, [customer, status, subtotal, tax, discount, loyalty, largeOrder, shipping, total, urgency]);
        return order;
    } catch (error) {
        throw error
    }
}

// get all orders, most for testing
// could be used for admin areas to see store wide stats

async function getOrders(){
    try {
        const { rows: order } = await client.query(`
        SELECT *
        FROM orders
        `)
        return orders
    } catch (error) {
        throw error
    }
}

// add cart item for all users
// need to create alternate for storing in local storage

async function createCartItem({ productId, orderId, productIdQuantity }) {
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

// recalls cart when user logs back in
// not sure how this works, might need more functionality
// might need at getOrderByUser(status="cart") instead

// find all orders by user and then find open order to return here 

async function getCartById(id) {
    try {
        const { rows: cart } = await client.query(`
            SELECT *
            FROM orders_products
            WHERE id=$1;
        `, [id])
        return cart
    } catch (error) {
        throw error
    }
}

//for user to pull up all orders on user account, checks with user ID

async function getOrdersByUser(customer) {
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
            WHERE customer=$1
            AND status="open";
        `, [customer])
        return orders
    } catch (error) {
        throw error
    }
}



module.exports = {
    createOrder,
    getOrders,
    createCartItem,
    getCartById,
    getOrdersByUser,
}