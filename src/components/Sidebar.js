import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart'

import './Sidebar.css'

const Sidebar = ({ cart, setCart, count, setCount, getTotal, removeFromCart, addToCart, products, increaseCart, decreaseCart }) => {

    return (
        <Col id="sidebar" className="col-pixel-width-400 col-md-12 text-center">
            <Cart products={products} cart={cart} setCart={setCart} count={count} setCount={setCount} getTotal={getTotal} removeFromCart={removeFromCart} addToCart={addToCart} increaseCart={increaseCart} decreaseCart={decreaseCart} />
            { cart.length > 0
                ?
                <Link className="cart-checkout-link mt-3 px-3 d-block" to="/checkout">
                    <Button variant="primary" className="btn-checkout" type="submit">Checkout ${getTotal(cart)}</Button>
                </Link>
                : ''
            }
        </Col>

    );

};

export default Sidebar;