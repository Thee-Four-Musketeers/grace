import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ product }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.type}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant='primary'>Add To Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
