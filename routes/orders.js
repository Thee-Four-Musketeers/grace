const express = require("express");

const cartRouter = express.Router();

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
cartRouter.get('/cart', async (req, res, next) => {
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

//recalls cart for logged in user
cartRouter.get('/cart', requireUser, async (req, res, next) => {
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


cartRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getOrders();
        res.send({
            orders
        });
    } catch (error) {
        throw error;
    }
})


module.exports = cartRouter;

