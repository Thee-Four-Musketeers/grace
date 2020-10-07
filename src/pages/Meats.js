import React, { useEffect } from 'react';
import { Col, CardDeck } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

import './Meats.css'

const Meats = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass, user }) => {

    useEffect(() => {
        setProductType(['meat']);
    }, [])

    useEffect(() => {
        setHeaderClass('meat');
    }, []);

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

export default Meats; 