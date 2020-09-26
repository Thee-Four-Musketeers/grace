import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ModalLogin from "./ModalLogin";
import ModalRegister from './ModalRegister';
import useModalRegister from './hooks/useModalRegister';
import useModalLogin from './hooks/useModalLogin';



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

    const [expanded, setExpanded] = useState(false);

    return (
        <Container id="header" className="px-0" fluid={true}>
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
                                <Link className="nav-link" to="/cheeses" onClick={() => setTimeout(() => {setExpanded(false)}, 50)}>Our Cheeses</Link>
                                <Link className="nav-link" to="/boards" onClick={() => setTimeout(() => {setExpanded(false)}, 50)}>Premade Boards</Link>
                                <Link className="nav-link" to="/sides" onClick={() => setTimeout(() => {setExpanded(false)}, 50)}>Accompaniments</Link>
                            </Nav>
                            <Nav>
                                { user.token
                                    ? <>
                                        <Button variant="outline-light" className="btn-controls mx-2">Account</Button>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={signOutHandler}>Sign Out</Button>
                                    </> : <>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={toggleLogin}>Sign In</Button>
                                        <Button variant="outline-light" className="btn-controls mx-2" onClick={toggle1}>Sign Up</Button>
                                    </>  
                                }
                                <Link className="cart-link" to="/cart">
                                    <i className="fas fa-shopping-cart cart-icon"></i>
                                    <span className="cart-count">{cartCount}</span>
                                </Link>
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
