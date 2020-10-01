const express = require("express");
const cartRouter = express.Router()
const { requireAdmin, requireUser } = require('./utils');

const {
    addToCart, getOrdersByUser, createCartItem
} = require('../db')


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
});

// Adds item to a cart

cartRouter.post('/:productId', requireUser, async (req, res, next) => {
    console.log('adding item to cart', req.path);
    try {
        const cart = await getOrdersByUser(req.user.username)
        console.log('CART', cart)
        const item = await createCartItem(req.params.productId, cart.id, 1)
        res.send({
            cart,
            item
        })
        console.log('cart', cart);
        console.log('item', item);
    } catch ({ name, message }) {
        next({ name, message })
    }
});

module.exports = cartRouter;