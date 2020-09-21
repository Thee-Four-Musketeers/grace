import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Col";

import './ModalLogin.css'
import './hooks/useModalRegister'

import { register } from "../api/index";


const ModalRegister = ({ isShowing, hide, user, setUser}) => {

    const [username, setUsername] = useState('');
    const [password1, setPassword] = useState('');
    const [password2, setPassword2] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('password 1...', password1);
        console.log('password 2...', password2);

        if (password1 === password2) {
            register({ username, password: password1 }).then((user) => {
                setUser(user);
            });
        }
    };

    const handleUser = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handlePassword2 = (event) => {
        setPassword2(event.target.value);
    };

    return (
        isShowing ? ReactDOM.createPortal(
        <>
            <Modal show={isShowing} onHide={hide} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container id="register">
                        <Row>
                            <Col>
                                <div>
                                    <Form>

                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="username"><i className="far fa-envelope"></i> Username</Form.Label>
                                            <Form.Control 
                                                id="field-username" name="username" 
                                                className="form-control" placeholder="Enter email" 
                                                type="text" onChange={handleUser}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label htmlFor="password"><i className="fas fa-lock"></i> Password</Form.Label>
                                            <Form.Control
                                                id="field-password" name="password" 
                                                className="form-control" placeholder="Enter password" 
                                                type="password" onChange={handlePassword}
                                            />
                                        </Form.Group>

                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="confirm-password"><i className="fas fa-lock"></i> Confirm Password</Form.Label>
                                            <Form.Control
                                                id="field-password-confirm" name="password-confirm"
                                                className="form-control" placeholder="Confirm password" 
                                                type="password" onChange={handlePassword2}
                                            />
                                        </Form.Group>

                                        <Form.Text id="passwordHelpBlock" muted>Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</Form.Text>

                                        <Button onClick={handleSubmit} className="btn btn-outline-dark" variant="primary" type="submit"><i className="fa fa-sign-in-alt mr-2"></i> Register</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>, document.body
        ) : null
    )
};

export default ModalRegister;

{/* <Modal show={isShowing} onHide={hide} backdrop="static">
    <Modal.Header closeButton>
        <Modal.Title>Registration</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <div className="form-group">
                <label><i className="far fa-envelope"></i> Email address</label>
            </div>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emoji.
    </Form.Text>

            <button type="submit" className="btn btn-outline-dark"><i className="fa fa-sign-in-alt mr-2"></i>Submit</button>

        </Form>
    </Modal.Body>
</Modal> */}