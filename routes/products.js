const express = require("express");

const productsRouter = express.Router()
// import functions here

const {
    getProducts,
    getProductsById,
    createProduct,
    getProductsByType
} = require('../db')


// build some routes here

// productsRouter.get('/:type', async (req, res, next) => {
//     console.log('req path 2', req.path);
//     const { type } = req.params;
//     console.log(type)
//     try {
//         const products = await getProductsByType(type)
//         res.send({
//             products
//         })
//     } catch ({ name, message }) {
//         next({ name, message })
//     }
// })

productsRouter.get(`/`, async (req, res, next) => {
    console.log('req path 1', req.path);
    const { type = '' } = req.query
    console.log("type is:", type)

    const typeArray = type.split(',').map(x => x.trim())
    try {
        // if there not a type idea
        let products
        if (!type) {
           products =  await getProducts()
        } else {
            products = await getProductsByType(type)
        }
        // const products = await getProductsByType(type)
        // else if there is type do something idea
        res.send({
            products
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
})




module.exports = productsRouter;