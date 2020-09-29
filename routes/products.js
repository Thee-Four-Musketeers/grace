const express = require("express");

const productsRouter = express.Router()
// import functions here
const { requireAdmin } = require('./utils');

const {
  getProducts,
  getProductsByTypes
} = require('../db')

const { requireAdmin } = require('./utils')

productsRouter.get(`/`, async (req, res, next) => {
  const { type = '' } = req.query
  const typeArr = type.split(',').map(el => el.trim())

  try {
    let products;
    if (!type) {
      products = await getProducts();
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

// PATCH /products/:productId
productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
  try {
    const { productId, ...fields } = req.body;
    const updatedProduct = await updateProduct({ id: req.params.routineId, productId, ...fields })
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});





module.exports = productsRouter;