import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container} from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { addItemToCart, fetchProductById } from '../api/index'

import './Products.css'


const Products = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass }) => {

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
                        <Col className="col-md-5 px-4">
                            <img className="mb-4" src={`/${product.imageUrl}`} alt="" />
                            <Card.Text className="aspects mb-1"><strong>Origin:</strong> {product.origin}</Card.Text>
                            <Card.Text className="aspects mb-1"><strong>Texture:</strong> {product.hardness}</Card.Text>
                            <Card.Text className="aspects mb-4"><strong>Bouquet:</strong> {product.odor}</Card.Text>
                        </Col>

                        <Col className="col-md-7 px-4">
                            <Card.Title className="py-2">{product.name}</Card.Title>
                            <Card.Text className="pb-2 price">${product.price} per pound</Card.Text>
                            <Card.Text className="pb-3">{product.description}</Card.Text>
                            <Button variant="primary" className="btn-card" type="submit" onClick={handleSubmit}>Add To Cart</Button>
                        </Col>


                        {/* <Card.Body> 
                            <Card.Title className="pb-0">{product.name}</Card.Title>
                            <Card.Text className="pb-0">{product.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="pb-4 pt-0">
                            <Card.Text className="pb-0 price">${product.price} per pound</Card.Text>
                        </Card.Footer> */}
                    </Row>
                    </Container>
                </> : ''        
            }
        </Col>
        </>
    );

};

export default Products;