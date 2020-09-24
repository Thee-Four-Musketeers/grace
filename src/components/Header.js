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

import { Link } from 'react-router-dom';

import './Header.css'

const Header = ({ user, setUser, cart }) => {
    let cartCount = cart.reduce((cartCount, items) => {
        return cartCount + items.count
    }, 0);

    const signOutHandler = (event) => {
        localStorage.removeItem('user');
        setUser({});
    }
    const { show, toggleLogin } = useModalLogin();
    const { isShowing, toggle1 } = useModalRegister();

    return (
        <Container id="header" className="px-0" fluid={true}>
            <Row className="m-auto">
                <Col>
                    <Navbar className="px-2" collapseOnSelect expand="xl">
                        <Link className="pl-3 pr-4" to="/">
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
                                <Nav.Link className="ModalLogin" onClick={toggleLogin}>Sign In</Nav.Link>
                                <Navbar.Text>|</Navbar.Text>
                                <Link className="nav-link" to="/login" onClick={signOutHandler}>Sign Out</Link>
                                <Navbar.Text>|</Navbar.Text>
                                <Nav.Link eventKey={2} href="/cart">
                                    <i className="fas fa-shopping-cart cart-icon"></i>
                                    <span className="cart-count">{cartCount}</span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <ModalLogin
                show={show} hide={toggleLogin}
                user={user} setUser={setUser}
            />
            <ModalRegister
                isShowing={isShowing} hide={toggle1}
                user={user} setUser={setUser}
            />
        </Container>
    )
}


export default Header;
