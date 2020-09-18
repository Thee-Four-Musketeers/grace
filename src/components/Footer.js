import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'

import './Footer.css'

const Footer = () => {
    return (
        <Container id="footer" className="px-0" fluid={true}>
            <Row className="m-auto">
                <Col>
                    <Navbar>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contactg">Contact</Nav.Link>
                    </Navbar>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Footer;