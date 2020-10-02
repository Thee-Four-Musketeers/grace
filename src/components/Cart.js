import React, { useReducer, useState, useEffect } from "react";
import { Container, Col, Row, Table } from 'react-bootstrap';

import './Cart.css'


const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

function getTotal(cart) {
    const total = cart.reduce((currentTotal, item) => currentTotal + item.price, 0);
    return total.toLocaleString(undefined, currencyOptions)
}


function cartReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.product];
        case 'remove':
            const productIndex = state.findIndex(item => item.name === action.product.name);
            if (productIndex < 0) {
                return state;
            }
            const update = [...state];
            update.splice(productIndex, 1)
            return update
        default:
            return state;
    }
}

const Cart = ({ products }) => {
    
    // useEffect(() => { setCart(['user']); }, []);

    const [cart, setCart] = useReducer(cartReducer, []);
    
    function addToCart(product) {
        setCart({ product, type: 'add' });
    }

    function removeFromCart(product) {
        setCart({ product, type: 'remove' });
    }

    return (

        <>
            <Container id="cart">
                <p>Your cart currently has {cart.length} items</p>
                <Col>
                    {
                        products && products.map(product => (
                            <div key={product.id} className="cart-item">
                                <div className="cart-item=image">{product.imageUrl}</div>
                                <div className="cart-item=name">{product.name}</div>
                                <div className="cart-item=price">{product.price}</div>
                                <div className="cart-item-actions">
                                    <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm cart-item-add "> + </button>
                                    <span clssName="cart-item-quantity">{product.quantity}</span>
                                    <button onClick={() => removeFromCart(product)} className="btn btn-primary btn-sm cart-item-remove "> - </button>
                                </div>
                                <div className="text-right cart-total">Total Price: { getTotal() }</div>
                            </div>
                        ))
                    }
                </Col>
                <p>Your total is ${getTotal(cart)}</p>
            </Container>
        </>

    )
};

export default Cart;