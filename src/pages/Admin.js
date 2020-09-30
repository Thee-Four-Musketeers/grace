import React from 'react';
import { Col } from 'react-bootstrap';
import ModalNewProduct from '../components/ModalNewProduct'

const Admin = () => {

    document.body.classList.add('solid', 'admin');

    return (
        <Col id="content">
            
            <ModalNewProduct />

        Find User

        Find Orders

        </Col>
    )
}

export default Admin;