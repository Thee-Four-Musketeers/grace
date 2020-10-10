import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Router from "next/router";
import './Checkout.css'
import Cart from '../components/Cart'
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

const StripePromise = loadStripe(`process.env.PUBLISHABLE_KEY`);

const Checkout = ({ products, cart, addToCart, count, setCount, setHeaderClass, getTotal, removeFromCart, getTaxes, grandTotal }) => {


    useEffect(() => {
        setHeaderClass('checkout');
    }, []);

    return (


        <Col id="content">
            <Container>
                <Row>

                    <Col className="col-6">
                        <Cart products={products}
                            cart={cart}
                            setCart={addToCart}
                            removeFromCart={removeFromCart}
                            count={count} setCount={setCount}
                            setHeaderClass={setHeaderClass}
                            getTotal={getTotal} />
                        <Row>

                            <Col className="col-3">Subtotal:</Col>
                            <Col className="col_totals">${getTotal(cart)}</Col>
                        </Row>
                        <Row>

                            <Col className="col-3">Tax {'(6%)'}: </Col>
                            <Col className="col_totals">${getTaxes(cart)}</Col>
                        </Row>
                        <Row>

                            <Col className="col-3">Shipping: </Col>
                            <Col className="col_totals">Free Overnight Shipping!</Col>
                        </Row>
                        <hr />
                        <Row>

                            <Col className="col-3">Total: </Col>
                            <Col className="col_totals">${grandTotal(cart)}</Col>
                        </Row>
                    </Col>
                    <Col className="col-6">
                        <Elements stripe={StripePromise}>
                            <CheckoutForm price={grandTotal(cart)} onSuccessfulCheckout={() => Router.push("/success")} />
                        </Elements>
                    </Col>

                </Row>
            </Container>
        </Col>


    );
};

export default Checkout;