import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'

const Header = () => {
    return (

        <Navbar className="header-absolute bg-dark-overlay" collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="#home"> <img className="navLogo" src="images/CheezyLogo_white.png" alt="cheezylogo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="">Premade Boards</Nav.Link>
                    <Nav.Link href="">View our Cheeses</Nav.Link>
                    <Nav.Link href="">Accompaniments</Nav.Link>

                </Nav>
                <Nav>
                    <Nav.Link href="#login">Login</Nav.Link>
                    <Nav.Link eventKey={2} href="">
                        <i className="fas fa-shopping-cart"></i>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
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