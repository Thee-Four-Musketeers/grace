import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';

import './ModalLogin.css'
import './hooks/useModalRegister'

import { register } from "../api/index";


const ModalRegister = ({ isShowing, hide, user, setUser}) => {

    const [username, setUsername] = useState('');
    const [password1, setPassword] = useState('');
    const [password2, setPassword2] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        if (password1 === password2) {
            register({ username, password: password1 }).then((user) => {
                setUser(user);
                // log them in here
                // redirect them
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
                    <Modal.Title>Get Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="form-group">
                            <Form.Label htmlFor="username">Email Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    id="field-username" name="username" 
                                    className="form-control" placeholder="Enter email" 
                                    type="text" onChange={handleUser} 
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    id="field-password" name="password" 
                                    className="form-control" placeholder="Enter password" 
                                    type="password" onChange={handlePassword} 
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    id="field-password-confirm" name="password-confirm" 
                                    className="form-control" placeholder="Confirm password" 
                                    type="password" onChange={handlePassword2} 
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Text id="passwordHelpBlock" className="ml-1 mb-4" muted>Your password must contain 8-20 characters and may consist of a combination of letters or numbers.</Form.Text>

                        <Button className="btn btn-enter" variant="primary" type="submit">Sign Up <i className="fa fa-sign-in-alt ml-2"></i></Button>                        
                    </Form>
                </Modal.Body>
            </Modal>
        </>, document.getElementById('root')
        ) : null
    )
};

export default ModalRegister;