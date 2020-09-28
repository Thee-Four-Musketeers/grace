import React from 'react';
import { Col } from 'react-bootstrap';
import Cart from '../components/Cart'

import './Sidebar.css'

const Sidebar = ({ cart, setCart, count, setCount }) => {

    return (
        <Col id="sidebar" className="col-pixel-width-360 col-xl-12">
            <h4 className="title">Build You Own Board</h4>
            <Cart  cart={cart} setCart={setCart} count={count} setCount={setCount} />
        </Col>       
    );
    
};

export default Sidebar;