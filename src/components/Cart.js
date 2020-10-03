import React, { useReducer, useState, useEffect } from "react";
import { Container, Col, Row, Table } from 'react-bootstrap';

import './Cart.css'

const Cart = ({ products, cart, addToCart, removeFromCart, getTotal }) => {

    return (

        <>
            <Container id="cart">
                <p>Your cart currently has {cart.length} items</p>
                <Col>
                    {
                        cart && cart.map(product => (
                            <div key={product.id} className="cart-item">
                                <div className="cart-item-image">{product.imageUrl}</div>
                                <div className="cart-item-name">{product.name}</div>
                                <div className="cart-item-price">{ Number(product.price) * Number(product.count) }</div>
                                <div className="cart-item-actions">
                                    <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm cart-item-add "> + </button>
                                    <span clssName="cart-item-quantity">{product.quantity}</span>
                                    <button onClick={() => removeFromCart(product)} className="btn btn-primary btn-sm cart-item-remove "> - </button>
                                </div>
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