import React from 'react';
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

    let username;
    let password1;
    let password2;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password1 === password2) {
            register({ username, password: password1 }).then((user) => {
                console.log('the user in react...', user);
                setUser(user);
            });
        }
    };

    const handleUser = (event) => {
        username = event.target.value;
    };
    const handlePassword = (event) => {
        password1 = event.target.value;
    };
    const handlePassword2 = (event) => {
        password2 = event.target.value;
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
                                    <Form id="login-form" onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Label htmlFor="username">Username</Form.Label>
                                            <Form.Control id="usernameReg" name="username" type="text" onChange={handleUser} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label htmlFor="password">Password</Form.Label>
                                            <Form.Control
                                                id="passwordReg"
                                                name="Password"
                                                type="password"
                                                onChange={handlePassword}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                                            <Form.Control
                                                id="passwordReg2"
                                                name="Password"
                                                type="password"
                                                onChange={handlePassword2}
                                            />
                                        </Form.Group>

                                        <Button className="d-inline-block" variant="primary" type="submit">Register</Button>
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