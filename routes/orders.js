const express = require("express");
const ordersRouter = express.Router();

const {
    createCart,
    getCartById,
    getOrders
} = require('../db')

const {
    requireUser
} = require('./utils')

//creates cart
ordersRouter.get('/cart', async (req, res, next) => {
    console.log('getting cart', req.path);
    try {
        const cart = await createCart()
        res.send({
            cart
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

// get orders

ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getOrders();
        res.send({
            orders
        });
    } catch (error) {
        throw error;
    }
});


// add order

ordersRouter.post('/', requireUser, async (req, res, next) => {
	try {
		const { status, subtotal, tax, shipping, total, urgency } = req.body;
		const customer = req.user.username;
		const [order] = await createOrder({ customer, status, subtotal, tax, shipping, total, urgency });
		res.send(order);
	} catch (error) {
		throw error;
	}
});


//recalls cart for logged in user

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    console.log('recalling user cart', req.path);
    try {
        const userCart = await getCartById(id);
        res.send({
            userCart
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
})

module.exports = ordersRouter;

