import React from 'react';
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

import './Cheeses.css'

const Cheeses = ({ products }) => {

    console.log('Cheese page products', products);
    // const [ products, setProducts ] = useState({});

    return (
        <Container className="productsContainer">
            <CardDeck>
                {
                    products && products.map(product => (

                        <ProductCard
                            key={product.id}
                            {...product}>
                        </ProductCard>))
                }
            </CardDeck>
        </Container>
    )
}

export default Cheeses; 