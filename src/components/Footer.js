import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Footer.css'

const Footer = () => {
    return (
        <Container id="footer" className="px-0" fluid={true}>
            <Row className="m-auto">
                <Col className="col-12 text-center pt-4 mt-1">Cheezy &copy; 2020 - All Rights Reserved</Col>
                <Col className="col-21 pb-1">
                    <Navbar className="justify-content-center pt-0">
                        <Nav>
                            <Link className="nav-link small" to="/about">About</Link>
                            <div class="nav-link small"> | </div>
                            <Link className="nav-link small" to="/contact">Contact</Link>
                            <div class="nav-link small"> | </div>
                            <Link className="nav-link small" to="/admin">Admin</Link>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Footer;