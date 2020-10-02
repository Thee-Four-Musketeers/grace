import React, { useState, useEffect } from 'react';
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
import ContactUs from '../pages/Contact'
import Admin from '../pages/Admin'
import AboutUs from '../pages/About';
import ControlPanel from '../pages/ControlPanel';

// import functions & css

import { addItemToCart, fetchCart, fetchProductsByType } from '../api';
import './App.css'

const App = () => {

    // set up various state variables

    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [headerClass, setHeaderClass] = useState('');


    // check local storage for user and set user

    function localStorageUser() {
        if (localStorage.getItem('user')) {
            const localStorageUser = JSON.parse(localStorage.getItem('user'));
            return localStorageUser;
        } else {
            return {};
        }
    }

    useEffect(() => {
        setUser(localStorageUser());
        fetchCart(user)
            .then((response) => {
                setCart(response.user)
            })
    }, []);

    // check product type for fetching correct products to product pages     

    useEffect(() => {
        fetchProductsByType([productType])
            .then((response) => {
                setProducts(response.products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [productType]);



    // cart

    // useEffect(() => {
    //     addItemToCart([cart])
    //         .then((response) => {
    //             setCart(response.item)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    // }, []);


    const addToCart = ({ id, productId }) => {
        const nextCart = [...cart];
        const index = nextCart.findIndex(cart => {
            return cart.id === id
        });
        if (index > -1) {
            nextCart[index].count += 1;
        } else {
            nextCart.push({
                id,
                productId,
                count: 1
            })
        }
        setCart(nextCart);
    }

    const removeFromCart = ({ id }) => {
        const nextCart = [...cart];
        const index = nextCart.findIndex(cart => cart.id === id);

        if (index === -1) {
            return;
        }
        if (nextCart[index].count === 1) {
            nextCart.splice(index, 1);
        } else {
            nextCart[index].count -= 1;
        }

        setCart(nextCart);
    }

    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} count={count} setCount={setCount} headerClass={headerClass} />
                <div id="all">
                    <main>
                        <Switch>

                            <Route exact path="/cheeses">
                                <Title title={'Artisanal Cheeses'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Cheeses products={products} setProductType={setProductType} cart={cart} setCart={setCart} addToCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar cart={cart} setCart={setCart} count={count} setCount={setCount} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/meats">
                                <Title title={'Specialty Meats'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Meats products={products} setProductType={setProductType} addToCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar cart={cart} setCart={setCart} count={count} setCount={setCount} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/fruits">
                                <Title title={'Fruits & Nuts'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Fruits products={products} setProductType={setProductType} addToCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar cart={cart} setCart={setCart} count={count} setCount={setCount} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/cart">
                                <Title title={'Shopping Cart'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Checkout cart={cart} setCart={setCart} count={count} setCount={setCount} setHeaderClass={setHeaderClass} />
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

                            <Route exact path="/control-panel">
                                <Title title={'Control Panel'} />
                                <Container id="wrapper">
                                    <Row>
                                        <ControlPanel user={user} setUser={setUser} setHeaderClass={setHeaderClass} />
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