import React from "react";
import { Container, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from "./CartItem";

import './Cart.css'

const Cart = ({ id, orderId, cart, setCart, addToCart, removeFromCart, getTotal, increaseCart, decreaseCart }) => {
    console.log('Here is the cart', cart)

    return (
        <>

            <Container id="cart">
                <Col className="col-12 cart-length pb-4">
                    <h4 className="cart-title text-center">Build Your Own Board</h4>
                    <div className="cart-item-message text-center">
                        <i className="fas fa-shopping-cart cart-icon1"></i>
                        <span>&nbsp;&nbsp;Your cart has&nbsp;<span class="cart-length-count">{cart.length}</span>&nbsp;item
                        {
                                cart.length > 1 || cart.length === 0
                                    ? 's'
                                    : ''
                            }</span>
                    </div>
                </Col>
                <Col className="col-12 p-0">
                    {cart && cart.map(product => (
                        <CartItem
                            key={id}
                            orderId={orderId}
                            id={product.id}
                            cart={cart}
                            setCart={setCart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            increaseCart={increaseCart}
                            decreaseCart={decreaseCart}
                            {...product}
                        />
                    ))}
                </Col>
            </Container>
        </>
    )
};

export default Cart;