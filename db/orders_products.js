const client = require('./client');
// const util = require('./util');

async function createCartItem(productId, orderId, productIdQuantity) {
    console.log('this product ID quantity', productIdQuantity);
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM orders_products 
            WHERE "productId" = $1 AND "orderId" = $2
        `, [productId, orderId]);

        console.log('this is rows', rows);

        if(!rows.length) {
            const { rows: [cart] } = await client.query(`
                INSERT INTO orders_products ("productId", "orderId", "productIdQuantity")
                VALUES ($1, $2, $3)
                RETURNING *;
            `, [productId, orderId, productIdQuantity]);
            
            console.log('this is the cart', cart)
            return cart; 
        } else {
            const updatedItem = await client.query(`
                UPDATE orders_products
                SET "productIdQuantity" = $1
                WHERE "productId" = $2
                AND "orderId" = $3
            `, [rows[0].productIdQuantity + 1, productId, orderId]);

            console.log('this is the updated item', updatedItem)
            return updatedItem;

        }
    } catch (error) {
        throw error
    }
}

async function deleteCartItem(productId, id) {
    console.log('hitting delete on db', productId)
    console.log('database ID', id)
    try {
        const { rows: [product] } = await client.query(`
            DELETE FROM orders_products AS op
            WHERE op."productId"=$1
            AND op."orderId"=$2;
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
