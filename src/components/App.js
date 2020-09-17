import React from 'react';
// import ReactDOM from 'react-dom';

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Main from "../components/Main";
import Footer from "../components/Footer";

const App = () => {
    
    // add state as needed 
    // add react router stuff below
    // add footer below
    // some jwt stuff will go below


    return (
        <>
            <Header />
            <Navigation />
            <Main>
                <div>Start container</div>
                <main>In our single page app we will use React Router to toggle the main content here</main>
                <div>End container</div>
            </Main>
            <Footer />
        </>
    )
};

export default App;