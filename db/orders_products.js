const client = require('./client');
// const util = require('./util');



async function createCartItem(productId, orderId, productIdQuantity) {
    try {
        const { rows: [cart] } = await client.query(`
        INSERT INTO orders_products ("productId", "orderId", "productIdQuantity")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [productId, orderId, productIdQuantity]);
        return cart;
    } catch (error) {
        throw error
    }
}

async function deleteCartItem(productId, orderId) {
    console.log('hitting delete on db')
    try {
        const { rows: [cart] } = await client.query(`
        DELETE  FROM orders_products AS op
        WHERE op."productId"=$1
        AND op."orderId"=$2;
        `, [productId, orderId]);
        return cart
    } catch (error) {
        throw error
    }
}

// async function createOrderProduct(orderId, productId) {
//     try {
//         const {
//             rows: [joint],
//         } = await client.query(`
//             INSERT INTO orders_products ("orderId", "productId")
//             VALUES ($1, $2)
//             ON CONFLICT ("orderId", "productId") DO NOTHING
//             RETURNING *;
//         `, [orderId, productId]
//         );
//         return joint;
//     } catch (error) {
//         throw error;
//     }
// }

// async function addProductsToOrder(orderId, productList) {
//     try {
//         const createProductList = productList.map(
//             product => createOrderProduct(orderId, product.id)
//         );
//         await Promise.all(createProductList);
//         return await getOrderById(orderId);
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = {
    createCartItem,
    deleteCartItem
    // addProductsToOrder,
    // createOrderProduct
};
