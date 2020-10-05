const express = require("express");
const productsRouter = express.Router()
const { requireAdmin, requireUser } = require('./utils');

const {
  addToCart,
  getProducts,
  getProductsByTypes,
  getProductById
} = require('../db')

// products by type or fall back to all

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


productsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await getProductById(id)
    res.send({
      product
    })
  } catch (error) {
    throw error
  }
})


// update product

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {

  // const [product] = await getProductsById(req.params.productId);

  try {

    const { productId, ...fields } = req.body;
    const updatedProduct = await updateProduct({
      id: req.params.routineId,
      productId,
      ...fields
    })
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }

});



// // update link

// linksRouter.patch('/:linkId', requireUser, async (req, res, next) => {
// 	const [link] = await getAllLinks(req.user.id, req.params.linkId);
// 	const { url, title, description, tags } = req.body;
// 	const updateFields = {};

// 	if (url) {
// 		updateFields.url = url;
// 	}
// 	if (title) {
// 		updateFields.title = title;
// 	}
// 	if (description) {
// 		updateFields.description = description;
// 	}

// 	try {
// 		if (link && link.creatorId === req.user.id) {
// 			const updatedLink = await updateLink(link.id, updateFields, tags);
// 			res.send({
// 				link: updatedLink,
// 			});
// 		}
// 	} catch ({ name, message }) {
// 		next({ name, message });
// 	}
// });

// module.exports = linksRouter;


module.exports = productsRouter;