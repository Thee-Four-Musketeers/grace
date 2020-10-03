import React from 'react';
import { Col } from 'react-bootstrap';
import Cart from '../components/Cart'

import './Sidebar.css'

const Sidebar = ({ cart, setCart, count, setCount, getTotal, products }) => {

    return (
        <Col id="sidebar" className="col-pixel-width-360 col-md-12 text-center">
            <h4 className="sidebarTitle">Build Your Own Board</h4>
            <Cart products={products} cart={cart} setCart={setCart} count={count} setCount={setCount} getTotal={getTotal} />
        </Col>
    );

};

export default Sidebar;