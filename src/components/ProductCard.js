import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductCard.css'


const ProductCard = ({ id, name, imageUrl, type, price, description }) => {

    function shorten(str, n) {
        return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
    }

    return (
        <Card className="text-center" key={id}>
            <Link className="" to="/{type}/{id}">
                <Card.Img variant="top" src={imageUrl} />
            </Link>
            <Card.Body>
                <Card.Title className="pb-0"><Link className="" to="/{type}/{id}">{name}</Link></Card.Title>
                <Card.Text className="pb-0">{shorten(description, 60) + '...'}</Card.Text>
            </Card.Body>
            <Card.Footer className="pb-4 pt-0">
                <Card.Text className="pb-0"><h6><strong>${price} per pound</strong></h6></Card.Text>
                <Button variant="primary" className="btn-card">Add To Cart</Button>
            </Card.Footer>
        </Card>
    );

};

export default ProductCard;
