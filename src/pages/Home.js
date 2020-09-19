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
                            <Col className="col-lg-8 col-xl-6 mx-auto text-white text-center">
                                <h5 className="text-uppercase text-white font-weight-light mb-4 letter-spacing-5">Welcome, Cheese Lover!</h5>
                                <h1 className="mb-5 h1">Get Cheezy!</h1>
                                <p className="lead mb-4">Whether you're searching for the perfect pair a variety of cheeses with fruits, nuts, crackers, and spreads for the ultimate appetizer platter, or an artisan cheese from a breakout American cheesemaker, a handmade raw milk cheese you've been daydreaming of since your Italian vacation, or a classic fresh cheese imported from France, you’ll find it here.</p>
                                <p> <button type="submit" className="btn btn-outline-dark btn-light">
                                    View Collection</button></p>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Home;

