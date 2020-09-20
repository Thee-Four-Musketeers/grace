const express = require("express");

const productsRouter = express.Router()
// import functions here

const { 
    getProducts,
    getProductsById,
    createProduct,
    getProductsByType
} = require ('../db')


// build some routes here

productsRouter.get('/', async (req, res, next)=>{
    try {
        const products = await getProducts()
        res.send({
            products
        })
    } catch (error) {
        throw errror
    }
})


productsRouter.get('/products', async (req,res,next) =>{
    const type = req.query.type
    try {
        const products = await getProductsByType(type)
        res.send({
            products
        })
    } catch (error) {
        throw error
    }
})




module.exports = productsRouter;