import React from 'react';
import ContactUsForm from './ContactUsForm';
import { Col } from 'react-bootstrap';

const ContactUs = () => {

    document.body.classList.add('solid', 'cheese');

    return (
        <Col id="content">
            <ContactUsForm />
        </Col>
    )
}

export default ContactUs;