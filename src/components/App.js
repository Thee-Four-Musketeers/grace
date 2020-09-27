import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import Header from "../components/Header";
import Title from "../components/Title";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Cheeses from "../pages/Cheeses";
import Meats from "../pages/Meats";
import Fruits from "../pages/Fruits";
import Cart from '../pages/Cart'

import { fetchCart, fetchProductsByType } from '../api';

import './App.css'

const App = () => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    // const [cartTotal, setCartTotal] = useState(0);

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
    }, []);

    useEffect(() => {
        fetchProductsByType([productType])
            .then((response) => {
                setProducts(response.products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [productType]);

    //cart

    useEffect(() => {
        // if (!user) {
        //     localStorageUser()
        // }
        fetchCart(user)
            .then((response) => {
                setCart(response.user)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const addToCart = ({ id, productId }) => {
        const nextCart = [...cart];
        const index = nextCart.findIndex(cart => cart.id === id);
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
            // don't do anything if we're trying to remove a card not in the deck
            return;
        }
        if (nextCart[index].count === 1) {
            // remove the card altogether
            nextCart.splice(index, 1);
        } else {
            // decrement the count
            nextCart[index].count -= 1;
        }

        setCart(nextCart);
    }
    console.log('cart here', cart)


    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} count={count} setCount={setCount} />
                <div id="all">
                    <main>
                        <Switch>

                            <Route exact path="/cheeses">
                                <Title title={'Artisanal Cheeses'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Cheeses products={products} setProductType={setProductType} addToCart={addToCart} />
                                        <Sidebar />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/meats">
                                <Title title={'Specialty Meats'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Meats products={products} setProductType={setProductType} addToCart={addToCart} />
                                         <Sidebar />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/fruits">
                                <Title title={'Fruits & Nuts'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Fruits products={products} setProductType={setProductType} addToCart={addToCart} />
                                        <Sidebar />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/cart">
                                <Title title={'Shopping Cart'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Cart cart={cart} setCart={setCart} count={count} setCount={setCount} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route path="/">
                                <Home />
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