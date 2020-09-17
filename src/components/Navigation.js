import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Cheese!</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Products" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Premade Boards</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Accompaniments</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Reorder Favorite</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#contactg">Contact</Nav.Link>

                </Nav>
                <Nav>
                    <Nav.Link eventKey={2} href="#memes">
                        Cart
      </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;