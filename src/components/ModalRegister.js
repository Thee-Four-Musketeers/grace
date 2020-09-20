import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

import './ModalLogin.css'
import './hooks/useModalRegister'

const ModalRegister = ({ isShowing, hide }) => {

    return (
        isShowing ? ReactDOM.createPortal(
            <>
                <Modal show={isShowing} onHide={hide} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="form-group">
                                <label><i className="far fa-envelope"></i> Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
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
                </Modal>
            </>, document.body
        ) : null
    )
};

export default ModalRegister;