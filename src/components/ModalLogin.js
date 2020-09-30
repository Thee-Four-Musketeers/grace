import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';

import { login } from '../api/index'

import './ModalLogin.css'
import './hooks/useModalLogin'

const ModalLogin = ({ show, toggleLogin, user, setUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();     
        login({username, password}).then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            toggleLogin();
            if(user.admin) {
                window.location.href = "/admin";
            }
        }).catch((error) => { throw error});
    }
    const usernameHandler = (event) => { setUsername(event.target.value); }
    const passwordHandler = (event) => { setPassword(event.target.value); }

    return (
        show 
        ? ReactDOM.createPortal(
            <>
                <Modal show={show} onHide={toggleLogin} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="username">Email Address</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        id="field-username" name="username" 
                                        className="form-control" placeholder="Enter email" 
                                        type="text" onChange={usernameHandler} 
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="form-group mb-4">
                                <Form.Label htmlFor="password">Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                        id="field-password" name="password" 
                                        className="form-control" placeholder="Enter password" 
                                        type="password" onChange={passwordHandler} 
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Button className="btn btn-enter mt-2" variant="primary" type="submit">Sign In <i className="fa fa-sign-in-alt ml-2"></i></Button>
                        </Form>

                    </Modal.Body>
                </Modal>
            </>, document.getElementById('root')
        ) : null
    )
};

export default ModalLogin;