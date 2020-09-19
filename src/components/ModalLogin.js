import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './ModalLogin.css'
import './hooks/useModalLogin'

const ModalLogin = ({ show, hide }) => {

    return (
        show 
        ? ReactDOM.createPortal(
            <>
                <Modal show={show} onHide={hide} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form id="login-form">
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="username"><i className="far fa-envelope"></i> Email address</Form.Label>
                                <Form.Control 
                                    id="field-username" name="username" 
                                    className="form-control" placeholder="Enter email" 
                                    type="text" />
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="password"><label><i className="fas fa-lock"></i> Password</label></Form.Label>
                                <Form.Control 
                                    id="field-password" name="password" 
                                    className="form-control" placeholder="Enter password" 
                                    type="password" />
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