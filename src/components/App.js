import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

// primary global components

import Header from "../components/Header";
import Title from "../components/Title";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

// primary page components

import Home from "../pages/Home";
import Cheeses from "../pages/Cheeses";
import Meats from "../pages/Meats";
import Fruits from "../pages/Fruits";

import Checkout from '../pages/Checkout'
import Admin from '../pages/Admin'
import Account from '../pages/Account';
import Products from '../pages/Products';
import AboutUs from '../pages/About';
import ContactUs from '../pages/Contact'
import PaymentSuccess from '../pages/PaymentSuccess'

// import functions & css

import { fetchCart, fetchProductsByType } from '../api';
import './App.css';

const App = () => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState([]);
    const [count, setCount] = useState(0);
    const [headerClass, setHeaderClass] = useState('');
    const [cart, setCart] = useReducer(cartReducer, []);

    //cart reducer handles page state and actions with useReducer
    function cartReducer(state, action) {
        const formatPrice = ({ amount, currency, quantity }) => {
            const numberFormat = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol',
            })
        };

        switch (action.type) {

            case
                'add':
                return [...state, action.product];

            case 'remove':
                const productIndex = state.findIndex(item => item.name === action.product.name);
                if (productIndex < 0) {
                    return state;
                }
                const update = [...state];
                update.splice(productIndex, 1)
                return update

            case 'set':
                return action.cart;

            case 'increment':
                return {
                    ...state,
                    quantity: state.quantity + 1,
                    price: formatPrice({
                        amount: state.unitAmount,
                        currency: state.currency,
                        quantity: state.quantity + 1,
                    }),
                };

            case 'decrement':
                return {
                    ...state,
                    quantity: state.quantity - 1,
                    price: formatPrice({
                        amount: state.unitAmount,
                        currency: state.currency,
                        quantity: state.quantity - 1,
                    }),
                };

            default:
                return state;
        }
    };

    //**reducer state functions**//

    function addToCart(product) {
        setCart({ product, type: 'add' });
    };

    function removeFromCart(product) {
        setCart({ product, type: 'remove' });
    };

    function decreaseCart(product) {
        setCart({ product, type: 'decrement' })
    };

    function increaseCart(product) {
        setCart({ product, type: 'increment' })
    };

    //sets price decimals to correct placement
    const currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }

    //sum of total of all items in cart
    function getTotal(cart) {

        if (cart) {
            const total = cart.reduce((currentTotal, item) => currentTotal + Number(item.price), 0);
            return total.toLocaleString(undefined, currencyOptions)
        } else {
            return '0';
        }
    }

    // checks local storage for user and sets user, or not.
    // technical debt, app crashes when user is logged out    

    function localStorageUser() {
        if (localStorage.getItem('user')) {
            const localStorageUser = JSON.parse(localStorage.getItem('user'));
            return localStorageUser;
        } else {
            return {};
        }
    }

    useEffect(() => {
        setUser(localStorageUser())
        console.log('localstorageuser', user)
        if (localStorage.getItem('user')) {
            fetchCart(user)
                .then((response) => {
                    setCart({ type: 'set', cart: response })
                })
                .catch((error) => {
                    console.error(error);
                })
        } else {
            setCart({ type: 'set', cart: [] })
        }
    }, []);

    //sets product type on correct page
    useEffect(() => {
        fetchProductsByType([productType])
            .then((response) => {
                setProducts(response.products);
            })
            .catch((error) => {
                console.error(error);
            }
            );
    }, [productType]);

    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} cart={cart} headerClass={headerClass} />
                <div id="all">
                    <main>
                        <Switch>
                            <Route exact path="/products/:id">
                                <Title title={'Products'} />

                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Products products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} count={count} setCount={setCount} getTotal={getTotal} increaseCart={increaseCart} decreaseCart={decreaseCart} removeFromCart={removeFromCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/cheeses">
                                <Title title={'Artisanal Cheeses'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Cheeses products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} removeFromCart={removeFromCart} count={count} setCount={setCount} getTotal={getTotal} increaseCart={increaseCart} decreaseCart={decreaseCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/meats">
                                <Title title={'Specialty Meats'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Meats products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} removeFromCart={removeFromCart} count={count} setCount={setCount} getTotal={getTotal} increaseCart={increaseCart} decreaseCart={decreaseCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/fruits">
                                <Title title={'Fruits & Nuts'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Fruits products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} removeFromCart={removeFromCart} count={count} setCount={setCount} getTotal={getTotal} increaseCart={increaseCart} decreaseCart={decreaseCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/cart">
                                <Title title={'Shopping Cart'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Checkout products={products} cart={cart} setCart={addToCart} removeFromCart={removeFromCart} count={count} setCount={setCount} setHeaderClass={setHeaderClass} getTotal={getTotal} increaseCart={increaseCart} decreaseCart={decreaseCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/admin">
                                <Title title={'Admin'} />
                                <Container id="wrapper">
                                    <Row>
                                        <Admin user={user} setUser={setUser} products={products} setProductType={setProductType} setHeaderClass={setHeaderClass} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/checkout">
                                <Title title={'Checkout'} />
                                <Container id="wrapper">
                                    <Row>
                                        <Checkout products={products} cart={cart} setCart={addToCart} removeFromCart={removeFromCart} count={count} setCount={setCount} setHeaderClass={setHeaderClass} getTotal={getTotal} increaseCart={increaseCart} decreaseCart={decreaseCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/checkoutsuccess">
                                <Title title={'Thank you for your order!'} />
                                <Container id="wrapper">
                                    <Row>
                                        <PaymentSuccess setHeaderClass={setHeaderClass} user={user} setUser={setUser} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/contact">
                                <Title title={'Contact Us'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <ContactUs setHeaderClass={setHeaderClass} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/account">
                                <Title title={'Account Info'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Account setHeaderClass={setHeaderClass} user={user} setUser={setUser} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/about">
                                <Title title={'About Us'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <AboutUs setHeaderClass={setHeaderClass} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route path="/">
                                <Home setHeaderClass={setHeaderClass} />
                            </Route>
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router>
        </>
    )

};

export default App;