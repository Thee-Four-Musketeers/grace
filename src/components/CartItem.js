import React from "react";  
import { Col, Row } from 'react-bootstrap';
import './Cart.css'

import { deleteItemFromCart } from '../api/index'

const CartItem = ({ id, orderId, productId, name, customer, imageUrl, description, count, price, cart, addToCart, removeFromCart, product, increaseCart, decreaseCart }) => {
    console.log('CartItemId', id)
    async function handleDelete(event) {
        event.preventDefault();
        try {
            const result = await deleteItemFromCart(id);
            console.log('deleteItemCart', result)
            removeFromCart({ name });
            console.log('get the name', id);
        } catch (error) {
            throw error
        }
    }

    const currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    // async function handleIncrease(event) {
    //     event.preventDefault();
    //     try {
    //         const result = await addItemToCart({ id, customer, description, orderId, name, price });
    //         increaseCart({ id, imageUrl, description, name, price, count: 1 });
    //     } catch (error) {
    //         throw error 
    //     }
    // }

    function shorten(str, n) {
        return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
    }

    // {shorten(description, 50) + '...'}

    return (
        <>
            <div id={id} className="cart-item">

                <Row>
                    <Col className="col col-pixel-width-150 pb-3 d-flex">
                        <img className="cart-item-image " src={`${imageUrl}`} alt="product thumbnail" />
                    </Col>
                    <Col className="col d-flex align-items-start flex-column pb-3">
                        <div className="cart-item-name text-left mb-1">{name}</div>
                        <div className="cart-item-desc text-left">{shorten(description, 50) + '...'}</div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-pixel-width-150 pb-0 d-flex">
                        <div className="cart-item-actions m-auto w-100">
                            <div className="cart-item-quantity">
                                <button className="btn btn-sm cart-item-change" >
                                    <i className="fas fa-plus" aria-hidden="true"></i>
                                </button>
                                <span className="cart-item-count text-center">{count}</span>
                                <button className="btn btn-sm cart-item-change">
                                    <i className="fas fa-minus" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="cart-item-remove pt-2 text-center" >
                                <button onClick={handleDelete}>remove</button>
                            </div>
                        </div>
                    </Col>
                    <Col className="col pb-0 d-flex">
                        <div className="cart-item-price w-100 text-right">
                            <span>$&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>{(Number(price) * Number(count)).toLocaleString(undefined, currencyOptions)}</span>
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default CartItem;