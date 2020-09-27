const express = require("express");

const productsRouter = express.Router()
// import functions here

const {
    getProducts,
    getProductsByTypes
} = require('../db')

productsRouter.get(`/`, async (req, res, next) => {
    const { type = '' } = req.query
    const typeArr = type.split(',').map(el => el.trim())

    try {
        let products;
        if (!type) {
           products =  await getProducts();
        } else {
            products = await getProductsByTypes(typeArr);
        }
        res.send({
            products
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
    
})




module.exports = productsRouter;