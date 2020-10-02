import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductCard.css'
import { fetchCart, addItemToCart } from '../api/index'

const ProductCard = ({ id, name, imageUrl, type, price, description, cart, setCart }) => {

    function shorten(str, n) {
        return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Handle Submit here')
        try {
            await addItemToCart({ id, count: 1 });
            await fetchCart()
                .then(result => {
                    setCart(result.id);
                })
        } catch (error) {
            throw error
        }
    }
    return (
        <Card className="text-center" key={id}>
            <Link to={{ pathname: `/` + `${type}` + '/' + `${id}` }}>
                <Card.Img variant="top" src={imageUrl} />
            </Link>
            <Card.Body>
                <Card.Title className="pb-0"><Link to={{ pathname: `/` + `${type}` + '/' + `${id}` }}>{name}</Link></Card.Title>
                <Card.Text className="pb-0">{shorten(description, 50) + '...'}</Card.Text>
            </Card.Body>
            <Card.Footer className="pb-4 pt-0">
                <Card.Text className="pb-0 price">${price} per pound</Card.Text>
                <Button variant="primary" className="btn-card" type="submit" onClick={handleSubmit}>Add To Cart</Button>
            </Card.Footer>
        </Card>
    );

};

export default ProductCard;