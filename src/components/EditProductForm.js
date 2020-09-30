
import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const EditProdForm = (
    id,
    name,
    description,
    price,
    type,
    imageUrl,
    origin,
    hardness,
    odor
) => {

    return (
        <>
            <Form key={id}>
                <Col>
                    <Form.Group controlId="formNewProduct">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder={name} />
                    </Form.Group>

                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter product description" />
                    </Form.Group>

                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="numeric" placeholder="$0.00" />
                    </Form.Group>

                    <Form.Group controlId="formType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control as="select">
                            <option>Cheese</option>
                            <option>Meat</option>
                            <option>Fruit</option>
                            <option>Nut</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.File id="formProductImage" label="Add Product Image" />
                    </Form.Group>

                    <Form.Group controlId="formNewProduct">
                        <Form.Label>Origin</Form.Label>
                        <Form.Control type="text" placeholder="Enter product origin" />
                    </Form.Group>

                    <Form.Group controlId="formNewProduct">
                        <Form.Label>Hardness</Form.Label>
                        <Form.Control type="text" placeholder="Enter product hardness" />
                    </Form.Group>

                    <Form.Group controlId="formNewProduct">
                        <Form.Label>Odor</Form.Label>
                        <Form.Control type="text" placeholder="Enter product odor" />
                    </Form.Group>

                </Col>
                <Button variant="primary" type="submit">
                    Submit
                        </Button>
            </Form>

        </>
    )
}

export default EditProdForm;