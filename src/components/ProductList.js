import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalEditProduct from '../components/ModalEditProduct'


import './ProductList.css'


const ProductList = ({ id, name, imageUrl, type, price, description, addToCart, products }) => {

    return (
        <ListGroup className="product-list" key={id} horizontal>
            <ListGroup.Item className="col col-pixel-width-75 product-id text-center">{id}</ListGroup.Item>
            <ListGroup.Item className="col col-pixel-width-120 product-img">
                <img src={`${imageUrl}`} alt="" />
            </ListGroup.Item>
            <ListGroup.Item className="col product-name"><Link to={{ pathname: `/` + `${type}` + '/' + `${id}` }}>{name}</Link></ListGroup.Item>
            <ListGroup.Item className="col col-pixel-width-150 product-actions text-right">
                <ModalEditProduct products={products} />
                <small> | </small>
                <Link to="#">Delete</Link>
            </ListGroup.Item>
        </ListGroup>
    );

};

export default ProductList;
