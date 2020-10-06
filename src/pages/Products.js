import React, { useState, useEffect } from 'react';
import { Col, Card, Button} from 'react-bootstrap';
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

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     try {
    //         const result = await addItemToCart({ id, count: 1 });
    //         setCart({ id, name, price, count: 1 });
    //     } catch (error) {
    //         throw error
    //     }
    // }

    return (
        <>  
        <Col id="content">
            <div>test 1</div>
                { product &&
                <Card className="text-center" key={product.id}>
                    <Card.Img variant="top" src={`/${product.imageUrl}`} />
                    <Card.Body> 
                        <Card.Title className="pb-0">{product.name}</Card.Title>
                        <Card.Text className="pb-0">{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="pb-4 pt-0">
                        <Card.Text className="pb-0 price">${product.price} per pound</Card.Text>
                    </Card.Footer>
                </Card>        
                }
            </Col>
        </>
    );

};

export default Products;