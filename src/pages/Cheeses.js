import React from 'react';
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

import './Cheeses.css'

const Cheeses = ({ products, setProductType }) => {

    setProductType('Cheese');

    console.log('Cheese page products', products);

    return (
        <div className="cheeseWrapper">
            <Container className="productsContainer">

                <Row>
                    <Col xs lg="2" className="cheeseSider">This is where we can put filters</Col>
                    <Col>
                        <Row className="cheeseHeader">Our Cheeses</Row>
                        <CardDeck>
                            {   
                                products.length
                                ? products.map(product => (
                                    <ProductCard key={product.id} {...product}></ProductCard>)
                                )
                                : ''
                            }
                        </CardDeck>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Cheeses; 