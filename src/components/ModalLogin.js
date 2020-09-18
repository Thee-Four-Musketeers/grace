import React from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './ModalLogin.css'

const ModalLogin = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modalX">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                        success="right" />
                                    <MDBInput label="Type your password" icon="lock" group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn>Login</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default ModalLogin;