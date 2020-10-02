import React, { useReducer, useState, useEffect } from "react";
import { Container, Col, Row, Table } from 'react-bootstrap';
import CartItem from '../components/CartItem'
import './Cart.css'


function cartReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.product];
        case 'remove':
            const productIndex = state.findIndex(item => item.name === action.product.name);
            if (productIndex < 0) {
                return state;
            }
            const update = [...state];
            update.splice(productIndex, 1)
            return update
        default:
            return state;
    }
}

const Cart = ({ products, count, setCount }) => {
    const [cart, setCart] = useReducer(cartReducer, [])

    console.log('the count is', count);

    useEffect(() => {
        setCart(['user']);
    }, [])

    const currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }

    function getTotal(cart) {
        const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
        return total.toLocaleString(undefined, currencyOptions)
    }

    function add(product) {
        setCart({ product, type: 'add' });
    }

    function remove(product) {
        setCart({ product, type: 'remove' });
    }

    return (

        <>
            {/* <button onClick={() => setCount(count + 1)}>Click</button> */}
            <Container id="cart">
                <p>Your cart currently has {cart.length} items</p>
                <Col>
                    {
                        products && products.map(product => (
                            <div key={product.id} className="cart-item">
                                <div>{product.imageUrl}</div>
                                <div>{product.name}</div>
                                <div>{product.price}</div>
                                <div>
                                    <button onClick={() => add(product)} className="btn btn-primary btn-sm"> + </button>
                                    {product.quantity}
                                    <button onClick={() => remove(product)} className="btn btn-primary btn-sm"> - </button>
                                </div>
                                <div className="text-right">Total Price</div>
                            </div>
                        ))
                    }
                </Col>
                <p>Your total is ${getTotal(cart)}</p>
            </Container>
        </>

    )
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
