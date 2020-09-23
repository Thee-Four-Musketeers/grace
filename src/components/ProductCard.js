import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProductCard.css'


const ProductCard = ({ id, name, type, description }) => {

    return (
        <Card key={id}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{type}</Card.Text>
                <Card.Text>{description}</Card.Text>
                <Button variant='primary'>Add To Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
