import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

import './Cheeses.css'

const Cheeses = ({ products }) => {
    console.log('Cheese page products', products);
    const [ product, setProduct ] = useState({});

    return (
        <>
            <Container className="productsContainer">
                <CardDeck>
                { 
                    products.length ? products.map((product) => {
                            return (<ProductCard key={product.id} product={product} />)
                        }) 
                    : ''
                }
                </CardDeck>
            </Container>
        </>
    )
}

export default Cheeses;