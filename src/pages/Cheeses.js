import React from 'react';
import './Cheeses.css'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card, CardDeck, Button } from 'react-bootstrap';

const Cheeses = () => {
    return (
        <>
            <div id="cheeseBackground" className="CheeseWrapper">
                <Container className="productsContainer">
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

                </Container>
            </div>
        </>
    )
}

export default Cheeses;