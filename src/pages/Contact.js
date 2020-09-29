import React from 'react';
import ContactUsForm from './ContactUsForm';
import { Col, Row } from 'react-bootstrap';
import './Contact.css';

const ContactUs = () => {

    document.body.classList.add('solid', 'cheese');

    return (
        <Col id="content">
            <Row className="contactForm">
                <p>Cheesy was founded in 2020 by a group of four programmers over a glass of fine Pinot Grigio.
                    It's conception was created out of our love for pairing exotic and gourmet foods for the perfect cheeseboard.
                    
                    We know the struggle of trying to find the perfect pieces to put together the perfect
                    spread of cheeses, meats, fruits, and nuts. Sometimes it involves traveling all over
                    town, and visits to several different stores. With some amazing contacts all over the world,
                    we've put together the best of the best, to make an absolutely amazing cheeseboard for
                    your next gettogether.</p>
            </Row>
            <ContactUsForm />
        </Col>
    )
}

export default ContactUs;