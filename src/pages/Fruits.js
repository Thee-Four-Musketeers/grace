import React, { useEffect } from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Fruits.css'

const Sides = ({ products, setProductType, addToCart, setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('fruit');
    }, []);

    useEffect(() => {
        setProductType(['fruit', 'nut']);
    }, [])

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