import React from "react";
import { Col } from 'react-bootstrap';

import './Cart.css'

const Cart = ({ cart, setCart, cartTotal, setCartTotal, count, setCount }) => {

    document.body.classList.add('solid', 'cart');

    const items = [
        {
            id: 1,
            name: "kraft singles - white cheddar",
            price: 3,
        },
        {
            id: 2,
            name: "Philidelphia Cream Cheese",
            price: 2,
        },
        {
            id: 3,
            name: "Borden Singles - Grilled Cheese Melts",
            price: 4,
        },
    ];



    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let oldCart = [...cart];
        oldCart = oldCart.filter((cartItem) => cartItem.id !== el.id);
        setCart(oldCart);
    };

    const listItems = items.map((element) => (
        <div key={element.id}>
            {`${element.name}: $${element.price}`}
            <input type="submit" value="add" onClick={() => addToCart(element)} />
        </div>
    ));

    const cartItems = cart.map((element) => (
        <div key={element.id}>
            {`${element.name}: $${element.price}`}
            <input type="submit" value="remove" onClick={() => removeFromCart(element)} />
        </div>
    ));

    return (
        <>
            
            <Col id="content">
                <button onClick={ () => setCount(count + 1)}>Click</button>
                <div className="cartWrapper">
                    <h4>STORE</h4>
                    <div>{listItems}</div>
                    <h4>CART</h4>
                    <div>{cartItems}</div>
                    <div>Total: ${cartTotal}</div>
                </div>
            </Col>
        </>
    );
};

export default Cart;
