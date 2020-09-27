import React from 'react';
import './ProductCard.css'

const CartItem = ({ id, name, imageUrl, price, addToCart, removeFromCart }) => {

    return (

        <tr key={id}>
            <th>{imageUrl}</th>
            <th>{name}</th>
            <th>{price}</th>
            <td>
                <button
                    onClick={() => addToCart(id, name)}
                    className="btn btn-primary btn-sm"
                >
                    +
                          </button>
                {/* {quantity} */}
                <button
                    onClick={() => removeFromCart(id)}
                    className="btn btn-primary btn-sm">-</button>
            </td>
            <th className="text-right">Total Price</th>

        </tr>
    )
}

export default CartItem;
