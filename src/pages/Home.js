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
                                    <Button className="btn btn-lg py-2 px-5" type="submit">Build Your Own Board!</Button>
                                </Link>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div class="sell">
                <Container className="section">
                    <Row>
                        <Col xl={4} className="d-flex align-items-center px-4">
                            <img className="round" src="images/cheese_wheels.jpg" alt="Our Cheese" />
                        </Col>
                        <Col xl={8} className="d-flex align-items-center px-4">
                            <div>
                                <h3>Artisanal Cheeses</h3>
                                <p>From our artisan cheesemakers to our partner farms, everyone at Cheezy are passionate about dairy as a force of good. We stand commited to our original mission to provide delicious cheeses from around the world that are made with loving hands and a touch of soul. </p>
                                <Link to="/cheeses">
                                    <Button className="btn btn-lg py-2 px-1" type="submit">Shop Cheese</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="sell">
                <Container className="section">
                    <Row>
                        <Col xl={8} className="d-flex align-items-center px-4">
                            <div>
                                <h3>Specialty Meats</h3>
                                <p> Food is an art and every step of the process takes true craftsmanship. Just as a chef combines ingredients to create the perfect dish, our selection of specialty meats, procured from the finest purveyors of beef, pork, and fowl will make a stunning addition to any cheese board.</p>
                                <Link to="/meats">
                                    <Button className="btn btn-lg py-2 px-1" type="submit">Shop Meats</Button>
                                </Link>
                            </div>
                        </Col>
                        <Col xl={4} className="d-flex align-items-center px-4">
                            <img className="round" src="images/meats_hanging.jpg" alt="Our Cheese" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="sell">
                <Container className="section">
                    <Row>
                        <Col xl={4} className="d-flex align-items-center px-4">
                            <img className="round" src="images/fruit_basket.jpg" alt="Our Cheese" />
                        </Col>
                        <Col xl={8} className="d-flex align-items-center px-4">
                            <div>
                                <h3>Exotic Fruits &amp; Nuts</h3>
                                <p>We source the highest quality exotic fruits and nuts from around the globe so that you can create a unique culinary experience for your guests. Amplify the savory delights of our artisanal cheese and meats, with these sweet and bold flavors.</p>
                                <Link to="/fruits">
                                    <Button className="btn btn-lg py-2 px-1" type="submit">Shop Fruits &amp; Nuts</Button>
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

