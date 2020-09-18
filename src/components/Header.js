import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'

const Header = () => {
    return (
        <Navbar className="header-absolute bg-dark-overlay" collapseOnSelect expand="xl">
            <img className="navLogo" src="images/CheezyLogo_white.png" alt="cheezylogo" />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav.Link className="navText">Premade Boards</Nav.Link>
            <Nav.Link className="navText">View our Cheeses</Nav.Link>
            <Navbar.Collapse className="navText" id="responsive-navbar-nav">
                <Nav className="mr-auto navText">
                    <NavDropdown className="navText" title="Accompaniments" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Meats</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Fruits</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Nuts</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Jelly</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Chocolates</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link eventKey={2} href="">
                        Cart
                        
      </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;