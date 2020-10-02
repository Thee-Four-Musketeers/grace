const client = require('./client');

// creates order when checking out
// this should be invoked when a successful payment was received

async function createOrder({ customer, status, subtotal, tax, shipping, total, urgency, products }) {
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


// async function getMoviesByCart(cartId) {
//     try {
//       const { rows: movies } = await client.query(`
//           SELECT c.id, m.title, m.price, m.img_url, mc.quantity
//           FROM cart as c
//           JOIN movies_cart as mc ON c.id = mc."cartId"
//           JOIN movies as m ON "movieId" = m.id
//           WHERE c.id = $1
//           RETURNING *;
//           `, [cartId]);
//       return movies;
//     } catch (error) {
//       console.error(error);
//     }
//   }



// get all orders, most for testing
// could be used for admin areas to see store wide stats

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

async function renderCart(id) {
    try {
        const { row: product } = await client.query(`
    SELECT o.customer, p.name, op."productIdQuantity" AS count
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
            AND status='open';
        `, [customer])
        console.log('getOrderbyuser', orders[0])
        return orders[0]
    } catch (error) {
        throw error
    }
}

module.exports = {
    // addToCart,
    createOrder,
    getOrders,
    getOrderById,
    getCartById,
    getOrdersByUser,
}