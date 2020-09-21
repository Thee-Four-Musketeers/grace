import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
    import { login } from '../api/index'

import './ModalLogin.css'
import './hooks/useModalLogin'



const ModalLogin = ({ show, hide, user, setUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        
        login({username, password}).then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }).catch((error) => { throw error});
    }

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);

    }

    return (
        show 
        ? ReactDOM.createPortal(
            <>
                <Modal show={show} onHide={hide} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={submitHandler}>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="username"><i className="far fa-envelope"></i> Email address</Form.Label>
                                <Form.Control 
                                    id="field-username" name="username" 
                                    className="form-control" placeholder="Enter email" 
                                    type="text" onChange={usernameHandler} />
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label htmlFor="password"><label><i className="fas fa-lock"></i> Password</label></Form.Label>
                                <Form.Control 
                                    id="field-password" name="password" 
                                    className="form-control" placeholder="Enter password" 
                                    type="password" onChange={passwordHandler} />
                            </Form.Group>

                            <Button className="d-inline-block" variant="primary" type="submit">Log In</Button>
                        </Form>

                    </Modal.Body>
                </Modal>
            </>, document.body
        ) : null
    )
};

export default ModalLogin;