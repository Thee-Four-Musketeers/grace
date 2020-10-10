const express = require("express");
const ordersRouter = express.Router();

const {
    createOrder,
    getOrders
} = require('../db')


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