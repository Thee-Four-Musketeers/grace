import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from "../components/Header";
import Home from "../pages/Home";
import Cheeses from "../pages/Cheeses";
import Boards from "../pages/Boards";
import Sides from "../pages/Sides";
import Footer from "../components/Footer";

import './App.css'

import { fetchProductsByType } from '../api';

const App = () => {
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState('Cheese');


    console.log('got the goods?', products);
    const [user, setUser] = useState({});

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

    // do we pass a type or not?

    useEffect(() => {
        fetchProductsByType(productType)
            .then((response) => {
                setProducts(response.products);
                console.log('useEffect FetchProducts', response.products)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    // test with user and without

    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} />
                <div id="all">
                    <main>
                        <Switch>
                            <Route path="/cheeses">
                                <Cheeses products={products} setProductType={setProductType} />
                            </Route>
                            <Route path="/boards">
                                <Boards products={products} setProductType={setProductType} />
                            </Route>
                            <Route path="/sides">
                                <Sides products={products} setProductType={setProductType} />
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