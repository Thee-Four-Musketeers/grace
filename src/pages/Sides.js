import React from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Sides.css'

const Sides = ({ products, setProductType }) => {

    setProductType('Sides');
    document.body.classList.add('solid', 'sides');

    return (
        <Col id="content">
            <CardDeck>
                {   
                    products && products.map(product => (
                        <ProductCard key={product.id} {...product}></ProductCard>)
                    )
                }
            </CardDeck>
        </Col>
    )

}

export default Sides; 