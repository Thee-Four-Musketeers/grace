import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Router from "next/router";
import './Checkout.css'
import Cart from '../components/Cart'
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

const StripePromise = loadStripe('pk_test_Gs27UHBrvRJZqik9NTC3dSID');

const Checkout = ({ products, cart, addToCart, count, setCount, setHeaderClass, getTotal, removeFromCart }) => {

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
                    </Col>
                    <Col className="col-6">
                        <Elements stripe={StripePromise}>
                            <CheckoutForm price={getTotal(cart)} onSuccessfulCheckout={() => Router.push("/success")} />
                        </Elements>
                    </Col>

                </Row>
            </Container>
        </Col>


    );
};

export default Checkout;