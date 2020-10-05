import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Home.css'

const Home = ({ setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('home');
    }, []);

    return (
        
        <>
            <div id="hero" className="hero-wrapper">
                <Container>
                    <Row className="vh-100">
                        <Col className="d-flex justify-content-center my-auto">
                            <div className="hero-content mx-auto text-white text-center">
                                <h5 className="text-uppercase text-white font-weight-light py-2 letter-spacing-5 font-weight-bold">Welcome, Cheese Lovers</h5>
                                <h1 className="pb-4 h1">Get Cheezy!</h1>
                                <p className="lead pb-3">
                                    Build your own Charcuterie board with the perfect selection of artisanal cheeses, specialty meats, and delicious fruits &amp; nuts.
                                    {/* Whether you're searching for the perfect variety of cheeses with fruits, nuts, crackers, and spreads for the ultimate appetizer platter, or an artisan cheese from a breakout American cheesemaker, a handmade raw milk cheese you've been daydreaming of since your Italian vacation, or a classic fresh cheese imported from France, you’ll find it here. */}
                                </p>
                                <Link to="/cheeses">
                                    <Button className="btn btn-lg py-2 px-5 mb-" type="submit">Build Your Own Board!</Button>
                                </Link>
                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Home;

