import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from "../components/Header";
import Title from "../components/Title";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Cheeses from "../pages/Cheeses";
import Boards from "../pages/Boards";
import Sides from "../pages/Sides";

import { Container, Row, Col } from 'react-bootstrap';  

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

    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} />
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