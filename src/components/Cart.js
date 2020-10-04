import React from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';

import './Cart.css'

import CartItem from "./CartItem";

const Cart = ({ products, count, setCart, cart, addToCart, removeFromCart, getTotal }) => {


    return (

        <>
            <Container id="cart">
                <div className="cartLength">Current<i className="fas fa-shopping-cart cart-icon1"></i> :    {cart.length} items</div>
                <Col>
                    {cart && cart.map(product => (

                        <CartItem
                            key={product.id}
                            addToCart={addToCart}
                            cart={cart}
                            removeFromCart={removeFromCart}
                            setCart={setCart}
                            {...product}
                        />
                    ))}
                </Col>
                <div className="cartTotal">Your total is: ${getTotal(cart)}</div>
                <Button variant="primary" className="btn-card" type="submit">Checkout</Button>

            </Container>
        </>

    )
};

export default Cart;