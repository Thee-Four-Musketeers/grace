const express = require("express");
const productsRouter = express.Router()
const { requireAdmin } = require('./utils');

const {
  addToCart,
  getProducts,
  getProductsByTypes
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

productsRouter.put('/:productId', async (req, res, next) => {
  console.log('adding item to cart', req.path);
  try {
    const item = await addToCart(id);
    res.send({
      item
    })
  } catch ({ name, message }) {
    next({ name, message })
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