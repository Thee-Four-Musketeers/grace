import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import ModalNewProduct from '../components/ModalNewProduct'

const AdminProducts = ({ products }) => {

    return (
        <>
            <Row>
                <Col><ModalNewProduct /></Col>
            </Row>
            <Row>
                <Col>
                {
                    products && products.map(product => (
                        <ProductList
                            key={product.id}
                            {...product}>
                        </ProductList>)
                    )
                }
                </Col>
            </Row>
        </>
    )
};

export default AdminProducts;