import React, { useEffect } from 'react';

import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductPage.css'
import { addItemToCart, fetchProductById } from '../api/index'

const ProductPage = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass }) => {
    useEffect(() => {
        setProductType(['cheese', 'meat', 'fruit', 'nut']);
    }, []);

    const product = fetchProductById(products.id)

    // async function handleSubmit(event) {
    //     event.preventDefault();

    //     try {

    //         const result = await addItemToCart({ id, count: 1 });
    //         setCart({ id, name, price, count: 1 });


    //     } catch (error) {
    //         throw error
    //     }
    // }
    console.log('product page', product)

    return (
        <>
            <Col id="content">

                <Card className="text-center" key={products.id}>
                    <Card.Img variant="top" src={products.imageUrl} />
                    <Card.Body>
                        <Card.Title className="pb-0">{products.name}</Card.Title>
                        <Card.Text className="pb-0">{products.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="pb-4 pt-0">
                        <Card.Text className="pb-0 price">${products.price} per pound</Card.Text>

                    </Card.Footer>
                </Card>
            </Col>
        </>
    );

};

export default ProductPage