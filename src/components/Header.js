import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import ModalLogin from "./ModalLogin";
import ModalRegister from './ModalRegister';
import useModalRegister from './hooks/useModalRegister';
import useModalLogin from './hooks/useModalLogin';
import './Header.css'

const Header = ({ user, setUser, cart, headerClass }) => {


    const history = useHistory();

    const signOutHandler = (event) => {
        localStorage.removeItem('user');
        setUser({});
        history.push('/');
        
    }
    const { show, toggleLogin } = useModalLogin();
    const { isShowing, toggleRegister } = useModalRegister();
    const [expanded, setExpanded] = useState(false);

    return (
        <Container id="header" className={`px-0 ${headerClass}`} fluid={true}>
            <Row className="m-auto">
                <Col>
                    <Navbar className="px-3" collapseOnSelect expanded={expanded} expand="xl">
                        <Navbar.Brand className="mr-4" href="/">
                            <img className="nav-logo" src="images/logo.png" alt="Cheezy Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle
                            className="responsive-navbar-nav"
                            onClick={() => setExpanded(expanded ? false : "expanded")}
                        />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="nav-link" to="/cheeses" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Our Cheeses</Link>
                                <Link className="nav-link" to="/meats" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Specialty Meats</Link>
                                <Link className="nav-link" to="/fruits" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Fruits&nbsp;&amp;&nbsp;Nuts</Link>
                            </Nav>
                            <Nav>
                                {user.admin && user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls mx-2">Admin</Button>
                                    </> : ''
                                }

                                {!user.admin && user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls btn-link mx-2">
                                            <Link to="/account" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Account</Link>
                                        </Button>

                                    </> : ''
                                }

                                {user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={signOutHandler}>Sign Out</Button>
                                    </> : <>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={toggleLogin}>Sign In</Button>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={toggleRegister}>Sign Up</Button>
                                    </>
                                }

                                <Link className="cart-link" to="/checkout">
                                    <i className="fas fa-shopping-cart cart-icon"></i>
                                    <span className="cart-count">{cart.length}</span>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <ModalLogin
                show={show} toggleLogin={toggleLogin}
                user={user} setUser={setUser}
            />
            <ModalRegister
                isShowing={isShowing} toggleRegister={toggleRegister}
                user={user} setUser={setUser}
            />
        </Container>
    )
}


export default Header;
