import React from 'react';
import './Home.css'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Home = () => {
    return (
        <>
            <div id="hero" className="hero-wrapper">
                <Container>
                    <Row className="vh-100">
                        <Col className="d-flex justify-content-center my-auto">
                            <h3 className="hero-content justify-content-lg-centermb-auto">Carolyn... maybe you have some ideas for this area?</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Home;