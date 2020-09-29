import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table } from 'react-bootstrap';
import CartItem from '../components/CartItem'
import './Cart.css'

const Cart = ({ products, cart, setCart, addToCart, removeFromCart, count, setCount }) => {

    console.log('the count is', count);

    useEffect(() => {
        setCart(['user']);
    }, [])

    return (

        // const products = [
        //     {
        //       id: 1,
        //       name: "Malm",
        //       price: 9900,
        //     },
        //     {
        //       id: 2,
        //       name: "Nordli",
        //       price: 16500,
        //     },
        //     {
        //       id: 3,
        //       name: "Kullen",
        //       price: 4500,
        //     },
        // ];

        <>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <Container id="cart">

                {
                    cart && cart.map(product => (
                        <Col>
                            <CartItem
                                key={product.id}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                                {...product}
                            />
                        </Col>
                    ))
                }

            </Container>
        </>

    );
};

export default Cart;

{/* <div className="cartWrapper">
    <Table borderless={true}>
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th className="text-right">Total Price</th>
            </tr>
        </thead>
        {cart && cart.map(product => (
            <CartItem
                key={product.id}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                {...product} />
        ))}
    </Table>
</div> */}
