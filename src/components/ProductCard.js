import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductCard.css'


const ProductCard = ({ id, name, type, description }) => {

    function shorten(str,n) {
        return (str.match(RegExp(".{"+n+"}\\S*"))||[str])[0];
    }

    return (
        <Card className="text-center" key={id}>
            <Link className="" to="/{type}/{id}">
                <Card.Img variant="top" src="images/Hero_CheesePlate_1.jpg" />
            </Link>
            <Card.Body>
                <Link className="" to="/{type}/{id}">
                    <Card.Title className="pb-1">{name}</Card.Title>
                </Link>
                <Card.Text className="pb-1">{ shorten(description, 60) + '...'}</Card.Text>
            </Card.Body>
            <Card.Footer className="pb-4 pt-0">
                <Button variant="primary" className="btn-card">Add To Cart</Button>
            </Card.Footer>
        </Card>
    );
    
};

export default ProductCard;
