import React from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';

import './Cart.css'

import { deleteItemFromCart } from '../api/index'

const CartItem = ({ id, name, imageUrl, description, count, price, addToCart, removeFromCart, product }) => {

    console.log('product', product);

    async function handleDelete(event) {
        event.preventDefault();
        try {
            const result = await deleteItemFromCart(id);
            removeFromCart(id);
        } catch (error) {
            throw error
        }
    }

    // function shorten(str, n) {
    //     return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
    // }
    // {shorten(description, 40) + '...'}

    return (
        <>
            <div key={id} className="cart-item">

                <Row>
                    <Col className="col col-pixel-width-150 pb-3 d-flex">
                        <img className="cart-item-image " src={`${imageUrl}`} alt="product thumbnail" />
                    </Col>
                    <Col className="col d-flex align-items-start flex-column pb-3">
                        <div className="cart-item-name text-left mb-1">{name}</div>
                        <div className="cart-item-desc text-left">This is a hard-coded fake place-holder description to work around a bug ...</div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-pixel-width-150 pb-0 d-flex">
                        <div className="cart-item-actions m-auto w-100">
                            <div className="cart-item-quantity">
                                <button className="btn btn-sm cart-item-change" onClick={() => addToCart(product)}>
                                    <i class="fas fa-plus" aria-hidden="true"></i>
                                </button>
                                <span className="cart-item-count text-center">{count}</span>
                                <button className="btn btn-sm cart-item-change" onClick={handleDelete} >
                                    <i class="fas fa-minus" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="cart-item-remove pt-2 text-center">
                                <a href="#">remove</a>
                            </div>
                        </div>
                    </Col>
                    <Col className="col pb-0 d-flex">
                        <div className="cart-item-price w-100 text-right pr-3">
                            <span>$&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>{Number(price) * Number(count)}</span>
                            </div>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default CartItem;