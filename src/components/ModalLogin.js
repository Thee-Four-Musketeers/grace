import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import './ModalLogin.css'
import './useModal'

const ModalLogin = ({ show, hide }) => show ? ReactDOM.createPortal(
    <>
        {/* <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog"> */}
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

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark">
                        <i class="fa fa-sign-in-alt mr-2"></i>Submit</button>

                </form>
            </Modal.Body>
        </Modal>
        {/* <div className="modalX">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label><i class="far fa-envelope"></i> Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label><i class="fas fa-lock"></i> Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark">
                        <i class="fa fa-sign-in-alt mr-2"></i>Submit</button>

                </form>
            </div> */}
        {/* </div> */}
    </>, document.body
) : null;

export default ModalLogin;