import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ModalLogin from "./ModalLogin";
import ModalRegister from './ModalRegister';
import useModalRegister from './hooks/useModalRegister';
import useModalLogin from './hooks/useModalLogin';

import { BrowserRouter as Link } from 'react-router-dom';

import './Header.css'

const Header = () => {
    const { show, toggle } = useModalLogin();
    const { isShowing, toggle1 } = useModalRegister();


    return (
        <Container id="header" className="px-0" fluid={true}>
            <Row className="m-auto">
                <Col>
                    <Navbar className="px-2" collapseOnSelect expand="md">
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
                                <Nav.Link className="ModalLogin" onClick={toggle1}>Register</Nav.Link>
                                <Navbar.Text>|</Navbar.Text>
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
                show={show}
                hide={toggle}
            />
            <ModalRegister
                isShowing={isShowing}
                hide={toggle1}
            />

        </Container>
    )
}

export default Header;