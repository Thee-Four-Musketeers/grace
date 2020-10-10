import React from 'react';
import { Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import './Contact.css'

const ContactUsForm = () => {

    document.body.classList.add('solid', 'cheese');

    return (
        <Col id="contact-form">
            <Row>
                <Col sm={12} className="intro">We welcome your questions, comments, and well wishes. Just fill out the form to get in touch. In the meanwhile, please remember to always <span>Keep It Cheezy</span>!</Col>
                <Col md={6} className="pb-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-user"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} className="pb-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text placeholder="name@example.com" id="basic-addon2"><i className="fas fa-envelope"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter email"
                            aria-label="User's email"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>

                </Col>
                <Col sm={12}>
                    <InputGroup className="pb-4">
                        {/* <InputGroup.Prepend>
                            <InputGroup.Text><i className="fas fa-edit"></i></InputGroup.Text>
                        </InputGroup.Prepend> */}
                        <FormControl rows="4" as="textarea" placeholder="Enter your message" aria-label="With textarea" />
                    </InputGroup>
                    <Button variant="primary" type="submit" className="btn-card" onClick={() => { alert('message sent!') }}>
                        <i className="fas fa-paper-plane"></i>
                        <span>&nbsp;&nbsp;&nbsp;Submit</span>
                    </Button>
                </Col>
            </Row>
        </Col>
    )
};

export default ContactUsForm;