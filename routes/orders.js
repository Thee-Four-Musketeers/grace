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





module.exports = ordersRouter;

