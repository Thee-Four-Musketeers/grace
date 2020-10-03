import React, { useState, useEffect, useReducer}  from 'react';
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
import UserAccount from '../pages/UserAccount';

// import functions & css

import { addItemToCart, fetchCart, fetchProductsByType } from '../api';
import './App.css'

const App = () => {

    // set up various state variables

    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState([]);
    const [count, setCount] = useState(0);
    const [headerClass, setHeaderClass] = useState('');


    const currencyOptions = {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
    }
    
    function getTotal(cart) {

        if(cart) {
            const total = cart.reduce((currentTotal, item) => currentTotal + Number(item.price), 0);
            return total.toLocaleString(undefined, currencyOptions)
        } else {
            return '0';
        }
    }
    
    function cartReducer(state, action) {        
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

            // case for increaseQty

                // const increaseQty = ({ id, productId }) => {
                //     const nextCart = [...cart];
                //     const index = nextCart.findIndex(cart => {
                //         return cart.id === id
                //     });
                //     if (index > -1) {
                //         nextCart[index].count += 1;
                //     } else {
                //         nextCart.push({
                //             id,
                //             productId,
                //             count: 1
                //         })
                //     }
                //     setCart(nextCart);
                // }

            // case for decreaseQty

                // const decreaseQty = ({ id }) => {
                //     const nextCart = [...cart];
                //     const index = nextCart.findIndex(cart => cart.id === id);

                //     if (index === -1) {
                //         return;
                //     }
                //     if (nextCart[index].count === 1) {
                //         nextCart.splice(index, 1);
                //     } else {
                //         nextCart[index].count -= 1;
                //     }
                //     setCart(nextCart);
                // }

            default:
                return state;
        }
    }

    const [cart, setCart] = useReducer(cartReducer, []);
    
    function addToCart(product) {
        setCart({ product, type: 'add' });
    }

    function removeFromCart(product) {
        setCart({ product, type: 'remove' });
    }


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
                setCart({ type: 'set', cart: response })
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
                                        <Cheeses products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} count={count} setCount={setCount} getTotal={getTotal} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/meats">
                                <Title title={'Specialty Meats'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Meats products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} count={count} setCount={setCount} getTotal={getTotal} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/fruits">
                                <Title title={'Fruits & Nuts'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Fruits products={products} setProductType={setProductType} cart={cart} setCart={addToCart} setHeaderClass={setHeaderClass} />
                                        <Sidebar products={products} cart={cart} setCart={addToCart} count={count} setCount={setCount} getTotal={getTotal} />
                                    </Row>
                                </Container>
                            </Route>

                            <Route exact path="/cart">
                                <Title title={'Shopping Cart'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <Checkout products={products} cart={cart} setCart={addToCart} count={count} setCount={setCount} setHeaderClass={setHeaderClass} getTotal={getTotal} />
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

                            <Route exact path="/user-account">
                                <Title title={'User Info'} />
                                <Container id="wrapper" fluid>
                                    <Row>
                                        <UserAccount setHeaderClass={setHeaderClass} user={user} setUser={setUser} />
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