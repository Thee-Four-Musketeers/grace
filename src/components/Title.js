import React from 'react';

import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import './Title.css'

const Title = ({ title }) => {

    return (
        
        <Container id="title" fluid>
            <Row>
                <Col>
                    <h1 class="title text-center py-4 my-4 mb-0">{title}</h1>
                </Col>
            </Row>
        </Container>
        
    );
};

export default Title;