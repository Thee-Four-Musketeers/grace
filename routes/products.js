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


productsRouter.get('/:type', async (req,res,next) =>{
    console.log('req path 2', req.path);
    const { type } = req.params;
    try {
        const products = await getProductsByType(type)
        res.send({
            products
        })
    } catch (error) {
        throw error
    }
})


productsRouter.get('/', async (req, res, next)=>{
    console.log('req path 1', req.path);
    try {

        // if there not a type idea
        const products = await getProducts()
        // else if there is type do something idea
        res.send({
            products
        })
    } catch (error) {
        throw errror
    }
})




module.exports = productsRouter;