import React, { useState, useEffect } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';

import { adminify } from '../api/index'

// import './ModalLogin.css'

const ControlPanel = ({ user, setUser, setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('control');
    }, []);

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleAdminify = (event) => {
        event.preventDefault();
        if (password1 === password2) {
            adminify({ username, password: password1 })
            .then((data) => {
                setUser(data.user);
            });
        }
    };

    const handleUser = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword1 = (event) => {
        setPassword1(event.target.value);
    };
    const handlePassword2 = (event) => {
        setPassword2(event.target.value);
    };

    let admin = false;
    if (localStorage.getItem('user') && user.admin) {
        admin = true
    }

    return (
        <Col id="content">
        { admin 
            ? 
            <Form onSubmit={handleAdminify}>

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
                            type="password" onChange={handlePassword1} 
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
            : <div>Access Denied</div>
        }
        </Col>
    )
};

export default ControlPanel;