import React from 'react';
import { Card, Button, Col, Row, Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductCard.css'
import { addItemToCart } from '../api/index'



const ProductCard = ({ id, name, imageUrl, type, price, description, cart, setCart, user }) => {


    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h2">We're sorry...</Popover.Title>
            <Popover.Content>
                <div className="pop-font">You must sign up or log in to continue.</div>
          </Popover.Content>
        </Popover>
    );

    function shorten(str, n) {
        return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await addItemToCart({ id, count: 1 });
            setCart({ id, name, price, count: 1 });
        } catch (error) {
            throw error
        }
    }
    
    return (
        <Card className="text-center" id={id}>
            <Link to={{ pathname: `/products` + '/' + `${id}` }}>
                <Card.Img variant="top" src={imageUrl} />
            </Link>
            <Card.Body>
                <Card.Title className="pb-0"><Link to={{ pathname: `/products` + '/' + `${id}` }}>{name}</Link></Card.Title>
                <Card.Text className="pb-0">{shorten(description, 50) + '...'}</Card.Text>
            </Card.Body>
            <Card.Footer className="pb-4 pt-0">
                <Card.Text className="pb-0 price">${price} per pound</Card.Text>

                { user.token
                ? <>
                    <Button variant="primary" className="btn-card" type="submit" onClick={handleSubmit}>Add To Cart</Button>
                </> : <>
                    <OverlayTrigger rootClose trigger="click" placement="right" overlay={popover}>
                        <Button variant="primary" className="btn-card" type="submit">Add To Cart</Button>
                    </OverlayTrigger>
                </>
                }

                {/* <Button variant="primary" className="btn-card" type="submit" onClick={handleSubmit}>Add To Cart</Button> */}
            </Card.Footer>
        </Card>
    );

};

export default ProductCard;