import React from 'react';
import { Col } from 'react-bootstrap';
import Cart from '../components/Cart'

import './Sidebar.css'

const Sidebar = ({ cart, setCart, count, setCount, getTotal, removeFromCart, addToCart, products }) => {

    return (
        <Col id="sidebar" className="col-pixel-width-480 col-md-12 text-center">
            <Cart products={products} cart={cart} setCart={setCart} count={count} setCount={setCount} getTotal={getTotal} removeFromCart={removeFromCart} addToCart={addToCart} />
        </Col>
    );

};

export default Sidebar;