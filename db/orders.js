const client = require('./client');

// creates order and new cart

async function createOrder({ customer, status, subtotal, tax, shipping, total, urgency }) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders (customer, status, subtotal, tax, shipping, total, urgency)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [customer, status, subtotal, tax, shipping, total, urgency]);
        return order;
    } catch (error) {
        throw error
    }
}

// get all orders, mostly for testing

async function getOrders() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM orders
        `)
        return rows
    } catch (error) {
        throw error
    }
}

// not sure if this is being used

async function getOrderById(orderId) {
    try {
        const { rows: order } = await client.query(`
        SELECT *
        FROM orders_products
        WHERE "orderId"=$1;
        `, [orderId]);
        return order
    } catch (error) {
        throw error
    }
}

// recall cart

async function renderCart(id) {
    try {
        const { rows: product } = await client.query(`
            SELECT o.customer, p.name, p.price, op."productIdQuantity" AS count
            FROM orders AS o
            JOIN orders_products as op ON o.id = op."orderId"
            JOIN products as p ON p.id = op."productId"
            WHERE o.id=$1;
        `, [id]);
        return product
    } catch (error) {
        throw error
    }
}

// find all orders by user and then find open order to return here 

async function getCartById(id) {
    try {
        const { rows: cart } = await client.query(`
            SELECT *
            FROM orders_products
            WHERE "orderId"=$1;
        `, [id])
        return cart
    } catch (error) {
        throw error
    }
}

//for user to pull up all orders on user account, checks with user ID

async function getOrderByUser(customer) {

    try {
        const { rows: orders } = await client.query(`
            SELECT * 
            FROM orders
            WHERE customer=$1
            AND status='open';
        `, [customer])
        if (!orders[0]) {
            const newCart = await createOrder({ customer,status: 'open', urgency: 'usps' });
            return newCart;
        }  
        return orders[0];
    } catch (error) {
        throw error
    }
}

module.exports = {
    renderCart,
    createOrder,
    getOrders,
    getOrderById,
    getCartById,
    getOrderByUser,
}