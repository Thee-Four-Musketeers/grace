import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import './ModalLogin.css'
import './hooks/useModalLogin'

const ModalLogin = ({ show, hide }) => {

    return (
        show ? ReactDOM.createPortal(
            <>
                <Modal show={show} onHide={hide} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label><i class="far fa-envelope"></i> Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label><i class="fas fa-lock"></i> Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}

                            <button type="submit" className="btn btn-outline-dark">
                                <i class="fa fa-sign-in-alt mr-2"></i>Submit</button>

                        </form>
                    </Modal.Body>
                </Modal>

            </>, document.body
        ) : null)
};

export default ModalLogin;