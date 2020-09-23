import React from 'react';
import './Sides.css'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card, CardDeck, Button } from 'react-bootstrap';

const Sides = () => {
    return (
        <>
            <div className="sidesWrapper">
                <Container className="productsContainer">

                    <Row>
                        <Col xs lg="2" className="sidesSider">This is where we can put filters</Col>
                        <Col>
                            <Row className="sidesHeader">Accompaniments</Row>
                            <CardDeck>
                                <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>
                                <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>                        <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>                        <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>                        <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>                        <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>                        <Card>
                                    <Card.Img variant="top" src="images/placeholder.jpg" />
                                    <Card.Body>
                                        <Card.Title>Cheese!</Card.Title>
                                        <Card.Text>
                                            This is where the info goes.
                                </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="info">View</Button>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default Sides;