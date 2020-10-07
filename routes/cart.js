const express = require("express");
const cartRouter = express.Router()
const { requireUser } = require('./utils');

const {
    getOrderByUser, createCartItem, renderCart, deleteCartItem
} = require('../db')

cartRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const order = await getOrderByUser(req.user.username);
        const cart = await renderCart(order.id);
        res.send({
            order,
            cart
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});


cartRouter.post('/:productId', requireUser, async (req, res, next) => {
    console.log('CartRouterPost', req.user)
    try {
        const cart = await getOrderByUser(req.user.username)
        const item = await createCartItem(req.params.productId, cart.id, 1)
        res.send({
            cart,
            item
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

cartRouter.delete('/:productId', async (req, res, next) => {
    console.log('hiting delete cart router', req.params)
    try {
        const cart = await getOrderByUser(req.user)
        const item = await deleteCartItem(req.params.productId, cart.id)
        res.send({
            cart,
            item
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

module.exports = cartRouter;