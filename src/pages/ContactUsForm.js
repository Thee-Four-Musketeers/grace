import React, { useState } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import './Contact.css'

const ContactUsForm = () => {
    // const [form, setForm] = useState('')

    document.body.classList.add('solid', 'cheese');

    return (
        <Container fluid className="contactForm">
            <Row >
                <Col className="contactRow">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-portrait"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <div className="clearWidth"></div>
                <Col className="contactRow">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Enter email"
                            aria-label="User's email"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                </Col>
            </Row>

            <Row>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Message</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>
                <br></br>
                <br></br>
            </Row>
            <div className="clearHeight"></div>
            <Row>

                <Button variant="primary" type="submit" className="btn-card" onClick={() => { alert('message sent!') }}>
                    <i className="fas fa-paper-plane"></i> Submit
                </Button>
            </Row>
        </Container>
    )
};

export default ContactUsForm;