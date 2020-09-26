const express = require("express");

const productsRouter = express.Router()
// import functions here

const {
    getProducts,
    getProductsById,
    createProduct,
    getProductsByTypes
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
    const { type = '' } = req.query
    const typeArray = type.split(',').map(x => x.trim())

    try {
        let products;
        if (!type) {
           products =  await getProducts();
        } else {
            products = await getProductsByTypes(typeArray);
        }
        res.send({
            products
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
    
})




module.exports = productsRouter;