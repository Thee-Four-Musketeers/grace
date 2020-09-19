import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import './ModalLogin.css'
import './hooks/useModalRegister'
import Form from 'react-bootstrap/Form'

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
                                <label><i class="far fa-envelope"></i> Email address</label>
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

                            {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}

                            <button type="submit" className="btn btn-outline-dark">
                                <i class="fa fa-sign-in-alt mr-2"></i>Submit</button>

                        </Form>
                    </Modal.Body>
                </Modal>
            </>, document.body
        ) : null)
};

export default ModalRegister;