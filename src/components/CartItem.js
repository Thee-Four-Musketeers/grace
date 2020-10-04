import React from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';

import './Cart.css'

import { deleteItemFromCart } from '../api/index'

const CartItem = ({ id, name, count, price, cart, setCart, addToCart, removeFromCart, product }) => {

    async function handleDelete(event) {
        event.preventDefault();
        try {
            console.log('handleDeleteProducts', id)

            const result = await deleteItemFromCart(id);
            removeFromCart(id);
        } catch (error) {
            throw error
        }
    }

    return (
        <>

            <div key={id} className="cart-item">
                <Row>
                    {/* <div className="cart-item=image">{product.imageUrl}</div> */}
                    <Col className="cartName"><div className="cart-item=name">{name}</div>
                    </Col>
                    <Row className="cartActions text-center">
                        <div className="cart-item-actions">
                            <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm cart-item-add "> + </button>
                            <span className="cart-item-quantity">     Qty:{count}     </span>
                            <button onClick={handleDelete} className="btn btn-primary btn-sm cart-item-remove "> - </button>

                        </div>
                    </Row>
                    <Col>
                        <div className="cart-item cartPrice">${Number(price) * Number(count)}</div>
                    </Col>
                </Row>

            </div>



        </>
    )
}

export default CartItem;