import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductList.css'


const OrderList = ({ orders, setOrders, customer, id, }) => {

    return (
        <ListGroup key={id} horizontal>
            <ListGroup.Item className="col col-pixel-width-60">{id}</ListGroup.Item>
            <ListGroup.Item className="col"><Link to={{ pathname: `/` + `${customer}` + '/' + `${id}` }}>Order Number: {id}</Link></ListGroup.Item>
        </ListGroup>
    );

};

export default OrderList;
