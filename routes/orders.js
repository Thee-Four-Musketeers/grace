const express = require("express");
const ordersRouter = express.Router();

const {
    createOrder,
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
// we may need to associate the order ID with a customer
// once they register or sign in


ordersRouter.post('/', async (req, res, next) => {
    try {
        const { status, subtotal, tax, shipping, total, urgency, products } = req.body;
        // const customer = req.user.username;
        const order = await createOrder({ status, subtotal, tax, shipping, total, urgency, products });
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
});



module.exports = ordersRouter;

