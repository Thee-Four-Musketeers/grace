import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container, Popover, OverlayTrigger } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { addItemToCart, fetchProductById } from '../api/index'

import './Products.css'

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h2">We're sorry...</Popover.Title>
        <Popover.Content>
            <div className="pop-font">You must sign up or log in to continue.</div>
        </Popover.Content>
    </Popover>
);

const Products = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass, user }) => {

    console.log('match', useParams());

    const [product, setProduct] = useState({})
    const productId = useParams().id

    useEffect(() => {

        async function fetchProduct() {
            const result = await fetchProductById(productId);
            setProduct(result.product[0]);
            console.log('product from product page', result)
        }
        fetchProduct();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const id = product.id;
            const name = product.name;
            const price = product.price;
            const result = await addItemToCart({ id, count: 1 });
            setCart({ id, name, price, count: 1 });
        } catch (error) {
            throw error
        }
    }

    return (

        <>  
        <Col id="content">
            { product 
                ? <>
                <Container fluid className="max-960">
                    <Row key={product.id} className="product-card">
                        <Col className="px-4" xl={5} lg={12}>
                            <img className="mb-4" src={`/${product.imageUrl}`} alt="" />
                            <Card.Text className="aspects mb-1"><strong>Origin:</strong> {product.origin}</Card.Text>
                            <Card.Text className="aspects mb-1"><strong>Texture:</strong> {product.hardness}</Card.Text>
                            <Card.Text className="aspects mb-4"><strong>Bouquet:</strong> {product.odor}</Card.Text>
                        </Col>

                        <Col className="px-4" xl={7} lg={12}>
                            <Card.Title className="py-2">{product.name}</Card.Title>
                            <Card.Text className="pb-2 price">${product.price} per pound</Card.Text>
                            <Card.Text className="pb-3">{product.description}</Card.Text>
                            {user.token
                                ? <>
                                    <Button variant="primary" className="btn-card" type="submit" onClick={handleSubmit}>Add To Cart</Button>
                                </> : <>
                                    <OverlayTrigger rootClose trigger="click" placement="right" overlay={popover}>
                                        <Button variant="primary" className="btn-card" type="submit">Add To Cart</Button>
                                    </OverlayTrigger>
                                </>
                            }
                        </Col>
                    </Row>
                    </Container>
                </> : ''        
            }
        </Col>
        </>
    );

};

export default Products;