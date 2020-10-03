import React from 'react';
import './ProductCard.css'

const CartItem = ({ id, name, imageUrl, price, cart, setCart, addToCart, removeFromCart }) => {

    return (
        <div key={id} className="cart-item">
            <div>{imageUrl}</div>
            <div>{name}</div>
            <div>Price: {price}</div>
            <div>
                <button onClick={() => addToCart(id, name)} className="btn btn-primary btn-sm"> + </button>
                {/* {quantity} */}
                <button onClick={() => removeFromCart(id)} className="btn btn-primary btn-sm"> - </button>
            </div>
        </div>
    );

};

export default CartItem;
