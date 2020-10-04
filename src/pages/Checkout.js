import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './Checkout.css'
import Cart from '../components/Cart'

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
                    </Col>
                </Row>
            </Container>
        </Col>
    );
};

export default Checkout;