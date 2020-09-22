import React from 'react';
import './Boards.css'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card, CardDeck, Button } from 'react-bootstrap';

const Boards = () => {
    return (
        <>
            <div className="boardWrapper">
                <Container className="productsContainer">

                    <Row>
                        <Col xs lg="2" className="boardSider">This is where we can put filters</Col>
                        <Col>
                            <Row className="boardHeader">Premade Cheeseboards</Row>
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

export default Boards;