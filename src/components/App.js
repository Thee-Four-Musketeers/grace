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

import { fetchProductsByType } from '../api';

import './App.css'

const App = () => {
    const [user, setUser] = useState({});
    
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState([]);
    
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    
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
        fetchProductsByType(productType)
            .then((response) => {
                setProducts(response.products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [productType]);

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} cart={cart} setCart={setCart} />
                <div id="all">
                    <main>
                        <Switch>

                            <Route path="/cheeses">
                                <Title title={'Our Cheeses'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Sidebar />
                                        <Cheeses products={products} setProductType={setProductType} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route path="/boards">
                                <Title title={'Pre-Made Boards'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Sidebar />
                                        <Boards products={products} setProductType={setProductType} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route path="/sides">
                                <Title title={'Accompaniments'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Sidebar />
                                        <Sides products={products} setProductType={setProductType} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route path="/cart">
                                <Title title={'Shopping Cart'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Cart cart={cart} cartTotal={cartTotal} setCart={setCart} />
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