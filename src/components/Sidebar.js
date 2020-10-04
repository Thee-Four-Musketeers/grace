import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart'

import './Sidebar.css'

const Sidebar = ({ cart, setCart, count, setCount, getTotal, removeFromCart, addToCart, products }) => {

    return (
        <Col id="sidebar" className="col-pixel-width-360 col-md-12 text-center">
            <h4 className="sidebarTitle">Build Your Own Board</h4>

            <Cart products={products} cart={cart} setCart={setCart} count={count} setCount={setCount} getTotal={getTotal} removeFromCart={removeFromCart} addToCart={addToCart} />
            <Link className="cart-link" to="/checkout"><Button variant="primary" className="btn-card" type="submit">Checkout</Button></Link>

        </Col>
    );

};

export default Sidebar;