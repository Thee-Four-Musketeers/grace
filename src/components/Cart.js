import React from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from "./CartItem";

import './Cart.css'

const Cart = ({ cart, setCart, addToCart, removeFromCart, getTotal }) => {

    return (
        <>
            <Container id="cart">
                <Col className="col-12 cart-length pb-4">
                    <h4 className="cart-title text-center">Build Your Own Board</h4>
                    <div className="cart-item-message text-center">
                        <i className="fas fa-shopping-cart cart-icon1"></i> 
                        <span>&nbsp;&nbsp;Your cart has&nbsp;<span class="cart-length-count">{cart.length}</span>&nbsp;items</span>
                    </div>
                </Col>
                <Col className="col-12 p-0">
                    {cart && cart.map(product => (
                        <CartItem
                            key={product.id}
                            cart={cart}
                            setCart={setCart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            {...product}
                        />
                    ))}
                </Col>
                <Link className="cart-link mt-3" to="/checkout">
                    <Button variant="primary" className="btn-checkout" type="submit">Checkout ${getTotal(cart)}</Button>
                </Link>
                
            </Container>
        </>
    )
};

export default Cart;