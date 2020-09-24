import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductCard.css'


const ProductCard = ({ id, name, type, description }) => {

    return (
        <Card className="text-center" key={id}>
            <Link className="" to="/{type}/{id}">
                <Card.Img variant="top" src="images/Cheeseplate2.jpg" />
            </Link>
            <Card.Body>
                <Link className="" to="/{type}/{id}">
                    <Card.Title className="pb-3">{name}</Card.Title>
                </Link>
                <Button variant="primary">Add To Cart</Button>
            </Card.Body>
        </Card>
    );
    
};

export default ProductCard;
