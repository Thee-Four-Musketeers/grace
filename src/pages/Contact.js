import React, { useEffect } from 'react';
import ContactUsForm from './ContactUsForm';
import { Col, Row } from 'react-bootstrap';
import './Contact.css';

const ContactUs = ({ setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('contact');
    }, []);

    return (
        <Col id="content">
            <Row className="contactForm">

            </Row>
            <ContactUsForm />
        </Col>
    )
}

export default ContactUs;