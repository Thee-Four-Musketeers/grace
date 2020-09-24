import React from "react";
import './Cart.css'

const Cart = ({ cart, setCart, cartTotal, setCartTotal }) => {
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
        <div className="cartWrapper">

            STORE
            <div>{listItems}</div>
            <div>CART</div>
            <div>{cartItems}</div>
            <div>Total: ${cartTotal}</div>
        </div>
    );
};

export default Cart;
