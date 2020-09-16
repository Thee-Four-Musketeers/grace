import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <Jumbotron fluid >
            <Container>
                <h1>Cheese!</h1>
                <p>From our cows to your table</p>
            </Container>
        </Jumbotron>
    )
}

export default Header;