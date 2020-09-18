import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// import NavDropdown from 'react-bootstrap/NavDropdown';

import './Header.css'

const Header = () => {
    return (
        <Container id="header" fluid={true}>
            <Row>
                <Col>
                    <Navbar className="header-absolute bg-dark-overlay px-4" collapseOnSelect expand="lg">
                        <Navbar.Brand className="mr-4 pr-2" href="#home">
                            <img className="nav-logo" src="images/CheezyLogo_white.png" alt="Cheezy Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#cheese">Our Cheeses</Nav.Link>
                                <Nav.Link href="">Premade Boards</Nav.Link>
                                <Nav.Link href="">Accompaniments</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#login">Login</Nav.Link>
                                <span className="separator px-4 py-2"> | </span>
                                <Nav.Link eventKey={2} href="#">
                                    <i className="fas fa-shopping-cart cart-icon"></i>
                                    <span className="cart-count">33</span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>

        // <Navbar className="header-absolute bg-dark-overlay" collapseOnSelect expand="xl" sticky="top">
        //     <img className="navLogo" src="images/CheezyLogo_white.png" alt="cheezylogo" />
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Nav.Link className="navText">Premade Boards</Nav.Link>
        //     <Nav.Link className="navText">View our Cheeses</Nav.Link>
        //     <Nav.Link className="navText">Accompaniments</Nav.Link>
        //     <Nav.Link className="text-light float-right">
        //         <i className="fas fa-shopping-cart"></i>
        //     </Nav.Link>
        // </Navbar>
    )
}

export default Header;