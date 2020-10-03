import React from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';

import './Cart.css'

const Cart = ({ products, cart, addToCart, removeFromCart, getTotal }) => {

    return (

        <>
            <Container id="cart">
                <div className="cartLength">Current<i className="fas fa-shopping-cart cart-icon1"></i> :    {cart.length} items</div>
                <Col>
                    {
                        cart && cart.map((product, idx) => (
                            <div key={idx} className="cart-item">
                                <Row>
                                    {/* <div className="cart-item=image">{product.imageUrl}</div> */}
                                    <Col className="cartName"><div className="cart-item=name">{product.name}</div>
                                    </Col>
                                    <Row className="cartActions text-center">
                                        <div className="cart-item-actions">
                                            <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm cart-item-add "> + </button>
                                            <span className="cart-item-quantity">     Qty:{product.count}     </span>
                                            <button onClick={() => removeFromCart(product)} className="btn btn-primary btn-sm cart-item-remove "> - </button>

                                        </div>
                                    </Row>
                                    <Col>
                                        <div className="cart-item cartPrice">${Number(product.price) * Number(product.count)}</div>
                                    </Col>
                                </Row>
                            </div>

                        ))
                    }
                </Col>
                <div className="cartTotal">Your total is: ${getTotal(cart)}</div>
                <Button variant="primary" className="btn-card" type="submit">Checkout</Button>

            </Container>
        </>

    )
};

export default Cart;