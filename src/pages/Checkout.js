import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './Checkout.css'

const Checkout = ({ cart, setCart, count, setCount  }) => {

    return (
        <Col id="content">
            <Container>
                <Row>
                    <Col className="col-6">
                        test
                    </Col>
                    <Col className="col-6">
                        <button onClick={ () => setCount(count + 1)}>Click</button>
                    </Col>
                </Row>
            </Container>
          <button onClick={ () => setCount(count + 1)}>Click</button>
        </Col>
    );
};

export default Checkout;