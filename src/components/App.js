import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import Header from "../components/Header";
import Title from "../components/Title";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Cheeses from "../pages/Cheeses";
import Boards from "../pages/Boards";
import Sides from "../pages/Sides";
import Cart from '../pages/Cart'

import { fetchCart, fetchProductsByType } from '../api';

import './App.css'

const App = () => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = ('0');
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

    // useEffect(() => {
    //     nextCount = [...setCartCount];
    //     if (!cart) {
    //         return
    //     } else {
    //         setCartCount.reduce((total, item) => {
    //             return total + item.count
    //         }, 0);
    //     } 
    //     setCartCount(nextCount)
    // }, [0])


    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} cartCount={cartCount} />
                <div id="all">
                    <main>
                        <Switch>

                            <Route exact path="/cheeses">
                                <Title title={'Our Cheeses'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Sidebar />
                                        <Cheeses products={products} setProductType={setProductType}
                                            addToCart={addToCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/boards">
                                <Title title={'Pre-Made Boards'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Sidebar />
                                        <Boards products={products} setProductType={setProductType}
                                            addToCart={addToCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/sides">
                                <Title title={'Accompaniments'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Sidebar />
                                        <Sides products={products} setProductType={setProductType}
                                            addToCart={addToCart} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/cart">
                                <Title title={'Shopping Cart'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Cart cart={cart} setCart={setCart}
                                            addToCart={addToCart} removeFromCart={removeFromCart} />
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