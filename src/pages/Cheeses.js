import React from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Cheeses.css'

const Cheeses = ({ products, setProductType }) => {

    setProductType('Cheese');
    document.body.classList.add('solid', 'cheese');

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

export default Cheeses; 