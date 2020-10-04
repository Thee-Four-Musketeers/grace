import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import ModalAddProduct from '../components/ModalAddProduct'

const AdminProducts = ({ products }) => {

    return (
        <>
            <Row>
                <Col className="pb-5"><ModalAddProduct /></Col>
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