import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Footer.css'

const Footer = () => {
    return (
        <Container id="footer" className="px-0" fluid={true}>
            <Row className="m-auto">
                <Col className="col-12 pb-1 text-center">
                    <Navbar className="justify-content-center pb-0">
                        <Nav className="justify-content-center flex-wrap">
                            <Link className="nav-link" to="/cheeses">Cheeses</Link>
                            <div className="nav-link small"> | </div>
                            <Link className="nav-link" to="/meats">Meats</Link>
                            <div className="nav-link small"> | </div>
                            <Link className="nav-link" to="/fruits">Fruits&nbsp;&amp;&nbsp;Nuts</Link>
                            <div className="nav-link small"> | </div>
                            <Link className="nav-link" to="/about">About</Link>
                            <div className="nav-link small"> | </div>
                            <Link className="nav-link" to="/contact">Contact</Link>
                            <div className="nav-link small"> | </div>
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </Nav>
                    </Navbar>
                </Col>
                <Col className="col-12 text-center">Cheezy &copy; 2020 - All Rights Reserved</Col>
            </Row>
        </Container>
    )
}

export default Footer;