import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ModalLogin from "./ModalLogin";
import useModal from './useModal';

import { BrowserRouter as Router, Link } from 'react-router-dom';

// import NavDropdown from 'react-bootstrap/NavDropdown';

import './Header.css'

const Header = () => {
    const { isShowing, toggle } = useModal();
    return (
        <Container id="header" className="px-0" fluid={true}>
            <Row className="m-auto">
                <Col>
                    <Navbar className="px-2" collapseOnSelect expand="xl">
                        <Link className="px-3" to="/">
                            <img className="nav-logo" src="images/CheezyLogo_white.png" alt="Cheezy Logo" />
                        </Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">

                                <Link className="nav-link" to="/cheeses">Our Cheeses</Link>
                                <Link className="nav-link" to="/boards">Premade Boards</Link>
                                <Link className="nav-link" to="/sides">Accompaniments</Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="ModalLogin" onClick={toggle}>Sign In</Nav.Link>
                                <Navbar.Text>|</Navbar.Text>
                                <Nav.Link eventKey={2} href="#">
                                    <i className="fas fa-shopping-cart cart-icon"></i>
                                    <span className="cart-count">33</span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <ModalLogin
                isShowing={isShowing}
                hide={toggle}
            />

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