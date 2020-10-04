import React, { useEffect } from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Cheeses.css'

const Cheeses = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass }) => {

    useEffect(() => {
        setProductType(['cheese']);
    }, []);

    useEffect(() => {
        setHeaderClass('cheese');
    }, []);

    return (
        <Col id="content">
            <CardDeck>
                {
                    products && products.map(product => (
                        <ProductCard
                            key={product.id}
                            addToCart={addToCart}
                            cart={cart}
                            setCart={setCart}
                            {...product}>
                        </ProductCard>
                    ))
                }
            </CardDeck>
        </Col>
    )

}

export default Cheeses; 