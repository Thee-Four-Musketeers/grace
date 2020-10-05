import React, { useState, useEffect } from 'react';
import { Col, Card, Button} from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { addItemToCart, fetchProductById } from '../api/index'

import './Products.css'


const Products = ({ products, setProductType, cart, setCart, addToCart, setHeaderClass }) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        async function fetchProduct() {
          const product = await fetchProductById();
          setProduct(product);
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
            <div>test</div>
            { 
            // product && product.map(item => (
            //     <Card className="text-center" key={id}>
            //         <Card.Img variant="top" src={imageUrl} />
            //         <Card.Body> 
            //             <Card.Title className="pb-0">{name}</Card.Title>
            //             <Card.Text className="pb-0">{description}</Card.Text>
            //         </Card.Body>
            //         <Card.Footer className="pb-4 pt-0">
            //             <Card.Text className="pb-0 price">${price} per pound</Card.Text>
            //         </Card.Footer>
            //     </Card>        
            // ))
            }
        </Col>
        </>
    );

};

export default Products;