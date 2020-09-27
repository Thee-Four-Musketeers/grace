import React, { useEffect } from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Fruits.css'

const Sides = ({ products, setProductType, addToCart }) => {

    useEffect(() => {
        setProductType(['fruit', 'nut']);
    }, [])

    document.body.classList.add('solid', 'sides');

    return (
        <Col id="content">
            <CardDeck>
                {
                    products && products.map(product => (
                        <ProductCard key={product.id}
                            addToCart={addToCart}
                            {...product}>
                        </ProductCard>)
                    )
                }
            </CardDeck>
        </Col>
    )

}

export default Sides;