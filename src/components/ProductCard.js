import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductCard.css'


const ProductCard = ({ id, name, imageUrl, type, price, description, addToCart }) => {

    function shorten(str, n) {
        return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
    }

    return (
        <Card className="text-center" key={id}>
            <Link className="" to="/{type}/{id}">
                <Card.Img variant="top" src={imageUrl} />
            </Link>
            <Card.Body>
                <Link className="" to="/{type}/{id}">
                    <Card.Title className="pb-1">{name}</Card.Title>
                </Link>
                <Card.Text className="pb-1">{shorten(description, 60) + '...'}</Card.Text>
            </Card.Body>
            <Card.Footer className="pb-4 pt-0">
                <Row>
                    <Col className="price">${price}</Col>
                    <Col><Button variant="primary" className="btn-card"
                        onClick={() => {
                            addToCart({
                                id,
                                name
                            })
                        }}
                    >Add To Cart</Button></Col>
                </Row>
            </Card.Footer>
        </Card>
    );

};

export default ProductCard;
