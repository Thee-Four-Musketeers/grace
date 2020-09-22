import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

import './Cheeses.css'

const Cheeses = ({ products }) => {

    // const [ products, setProducts ] = useState({});

    return (
        <>
            <div id="cheeseBackground" className="CheeseWrapper">
                <Container className="productsContainer">
                    <CardDeck>
                    { 
                        products.length 
                        ? products.map((product) => {
                                return (<ProductCard key={product.id} product={product} />)
                            }) 
                        : ''
                    }
                    </CardDeck>

                </Container>
            </div>
        </>
    )
}

export default Cheeses;