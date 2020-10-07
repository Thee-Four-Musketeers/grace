import React, { useEffect } from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Fruits.css'

const Sides = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass, user }) => {

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
                        <ProductCard
                            user={user}
                            key={product.id}
                            addToCart={addToCart}
                            cart={cart}
                            setCart={setCart}
                            {...product}>
                        </ProductCard>)
                    )
                }
            </CardDeck>
        </Col>
    )

}

export default Sides;