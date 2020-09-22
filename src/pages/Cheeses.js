import React, { useState } from 'react';
import './Cheeses.css'
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Cheeses = ({ products }) => {

    console.log('is this products', products);
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