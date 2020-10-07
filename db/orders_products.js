const client = require('./client');
// const util = require('./util');



async function createCartItem(productId, orderId, productIdQuantity) {
    try {
        const { rows: [cart] } = await client.query(`
        INSERT INTO orders_products ("productId", "orderId", "productIdQuantity")
            VALUES ($1, $2, $3)
            ON CONFLICT ("productId", "orderId") DO UPDATE SET "productIdQuantity" = orders_products."productIdQuantity" + 1
            RETURNING *;
        `, [productId, orderId, productIdQuantity]);
        return cart;
    } catch (error) {
        throw error
    }
}

async function deleteCartItem(productId, id) {
    console.log('hitting delete on db')
    try {
        const { rows: [product] } = await client.query(`
        DELETE FROM orders_products AS op
        WHERE op."productId"=$1
        AND op.id=$2;
        `, [productId, id]);
        return product
    } catch (error) {
        throw error
    }
}

async function addProductsToOrder(orderId, productList) {
    try {
        const { rows: [order] } = await client.query(`
        UPDATE orders_products AS op
        SET op.productIdQuantity AS count
        WHERE op."productId"=$2`)
    } catch (error) {
        throw error;
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

module.exports = {
    createCartItem,
    deleteCartItem,
    addProductsToOrder
    // createOrderProduct
};
