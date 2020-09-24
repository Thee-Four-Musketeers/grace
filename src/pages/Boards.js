import React from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Boards.css'

const Boards = ({ products, setProductType }) => {

    setProductType('Boards');
    document.body.classList.add('solid', 'board');

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

export default Boards; 