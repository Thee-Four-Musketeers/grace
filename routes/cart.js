const express = require("express");
const cartRouter = express.Router()
const { requireUser } = require('./utils');

const {
    getOrderByUser, createCartItem
} = require('../db')


// creates cart

// POSSIBLY NOT NECESSARY

// cartRouter.get('/cart', async (req, res, next) => {
//     console.log('getting cart', req.path);
//     try {
//         const cart = await createCart()
//         res.send({
//             cart
//         })
//     } catch ({ name, message }) {
//         next({ name, message })
//     }
// });

//recalls cart for logged in user

// I BELIEVE THIS ROUTE NEEDS TO BE CHECKED

// cartRouter.get('/cart/', requireUser, async (req, res, next) => {
//     console.log('recalling user cart', req.path);
//     try {
//         const userCart = await getCartById(id);
//         res.send({
//             userCart
//         })
//     } catch ({ name, message }) {
//         next({ name, message })
//     }
// });

// I REWROTE THIS ROUTE BELOW, ORIGNAL IS ABOVE

cartRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const cart = await getOrderByUser(req.user.username)
        res.send({
            cart
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

// Adds item to a cart

cartRouter.post('/:productId', requireUser, async (req, res, next) => {
    try {
        const cart = await getOrderByUser(req.user.username)
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