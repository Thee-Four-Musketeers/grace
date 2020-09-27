import React, { useEffect } from "react";
import { Col, Table } from 'react-bootstrap';
import CartItem from '../components/CartItem'
import './Cart.css'

const Cart = ({ cart, setCart, addToCart, removeFromCart, count, setCount }) => {

    document.body.classList.add('solid', 'cart');
    useEffect(() => {
        setCart(['user']);
    }, [])



    return (

        <Col id="content">
          <button onClick={ () => setCount(count + 1)}>Click</button>
            <div className="cartWrapper">
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
            </div>
        </Col>

    );
};

export default Cart;
