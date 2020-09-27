import React, { useEffect } from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Meats.css'

const Meats = ({ products, setProductType, addToCart }) => {

    useEffect(() => {
        setProductType(['meat']);
    }, [])

    document.body.classList.add('solid', 'boards');

    return (
        <Col id="content">
            <CardDeck>
                {
                    products && products.map(product => (
                        <ProductCard
                            key={product.id}
                            addToCart={addToCart}
                            {...product}>
                        </ProductCard>)
                    )
                }
            </CardDeck>
        </Col>
    )

}

export default Meats; 