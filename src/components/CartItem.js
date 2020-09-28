import React from 'react';
import './ProductCard.css'

const CartItem = ({ id, name, imageUrl, price, addToCart, removeFromCart }) => {

    return (
        <div key={id} className="cart-item">
            <div>{imageUrl}</div>
            <div>{name}</div>
            <div>{price}</div>
            <div>
                <button onClick={() => addToCart(id, name)} className="btn btn-primary btn-sm"> + </button>
                {/* {quantity} */}
                <button onClick={() => removeFromCart(id)} className="btn btn-primary btn-sm"> - </button>
            </div>
            <div className="text-right">Total Price</div>
        </div>
    );

};

export default CartItem;
