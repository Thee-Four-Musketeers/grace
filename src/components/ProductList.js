import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductList.css'


const ProductList = ({ id, name, imageUrl, type, price, description, addToCart }) => {

    return (
        <ListGroup key={id} horizontal>
            <ListGroup.Item className="col col-pixel-width-60">{id}</ListGroup.Item>
            <ListGroup.Item className="col"><Link to={{ pathname: `/` + `${type}` + '/' + `${id}` }}>{name}</Link></ListGroup.Item>
            <ListGroup.Item className="col col-pixel-width-120 text-right">Edit <small>|</small> Delete</ListGroup.Item>
        </ListGroup>
    );

};

export default ProductList;
