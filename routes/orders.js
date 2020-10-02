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
        const { customer, status, subtotal, tax, shipping, total, urgency } = req.body;
        const order = await createOrder({ customer, status, subtotal, tax, shipping, total, urgency });
        res.send(order);
    } catch (error) {
        throw error;
    }
});





module.exports = ordersRouter;