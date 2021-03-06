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
        <Container id="header" className={`p-0 ${headerClass}`} fluid={true}>
            <Row className="mx-0">
                <Col className="px-0">
                    <Navbar className="navbar-dark p-0" collapseOnSelect expanded={expanded} expand="xl">
                        <Navbar.Brand className="m-0" href="/">
                            <img className="nav-logo" src="images/logo.png" alt="Cheezy Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle
                            className="responsive-navbar-nav"
                            onClick={() => setExpanded(expanded ? false : "expanded")}
                        />
                        <Link className="cart-link mobile-cart" to="/checkout">
                            <i className="fas fa-shopping-cart cart-icon"></i>
                            <span className="cart-count">{cart.length}</span>
                        </Link>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="nav-link" to="/cheeses" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Our Cheeses</Link>
                                <Link className="nav-link" to="/meats" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Specialty Meats</Link>
                                <Link className="nav-link" to="/fruits" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Fruits&nbsp;&amp;&nbsp;Nuts</Link>
                                <Link className="nav-link" to="/about" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>About</Link>
                                <Link className="nav-link" to="/contact" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Contact</Link>
                                
                            </Nav>
                            <Nav className="nav-controls">
                                { user.admin && user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls btn-link mx-2">
                                        <Link to="/admin" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Admin</Link>
                                        </Button>
                                    </> : ''
                                }
                                { !user.admin && user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls btn-link mx-2">
                                            <Link to="/account" onClick={() => setTimeout(() => { setExpanded(false) }, 50)}>Account</Link>
                                        </Button>

                                    </> : ''
                                }
                                { user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={signOutHandler}>Sign Out</Button>
                                    </> : <>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={toggleLogin}>Sign In</Button>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={toggleRegister}>Sign Up</Button>
                                    </>
                                }
                                <Link className="cart-link screen-cart" to="/checkout">
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
