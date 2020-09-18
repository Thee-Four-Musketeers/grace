import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

const Footer = () => {
    return (
        <Navbar>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contactg">Contact</Nav.Link>
        </Navbar>
    )
}

export default Footer;