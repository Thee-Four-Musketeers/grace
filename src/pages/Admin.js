import React from 'react';
import { Col } from 'react-bootstrap';
import ModalNewProduct from '../components/ModalNewProduct'
import ModalEditProduct from '../components/ModalEditProduct'

const Admin = (products, setProductType) => {

    document.body.classList.add('solid', 'admin');

    return (
        <Col id="content">
            <ModalNewProduct />
            <ModalEditProduct />

        Find User

        Find Orders

        </Col>
    )
}

export default Admin;