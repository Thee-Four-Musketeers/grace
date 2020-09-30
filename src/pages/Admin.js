import React, { useState, useEffect } from 'react';
import { Row, Col, CardDeck } from 'react-bootstrap';
import ModalNewProduct from '../components/ModalNewProduct'
import ModalEditProduct from '../components/ModalEditProduct'
import ProductList from '../components/ProductList';

const Admin = ({ user, products, setProductType }) => {

    useEffect(() => {
        setProductType(['fruit', 'nut']);
    }, [])
    
    let admin = false;
    if (localStorage.getItem('user') && user.admin) {
        admin = true
    }
    
    return (
    
        <Col id="content">
            { admin 
                ? <>
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
                : <><div>Access Denied</div></> 
            }
        </Col>

        
        
    )
}

export default Admin;