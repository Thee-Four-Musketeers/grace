
import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Col } from 'react-bootstrap';



const ModalNewProduct = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [type, setType] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [origin, setOrigin] = useState('');
    // const [hardness, setHardness] = useState('');
    // const [odor, setOdor] = useState('');

    const onChange = (update) => (event) => {
        event.preventDefault();
        update(event.target.value)
    }

    // async function handleSubmit(event) {
    //     event.preventDefault();

    //     await createProduct({ name, description, price, type, imageUrl, origin, hardness, odor })
    //         .then(result => {
    //             setName('');
    //             setDescription('');
    //             setPrice('');
    //             setType('');
    //             setImageUrl('');
    //             setOrigin('');
    //             setHardness('');
    //             setOdor('');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="fas fa-plus"></i> Add Product
        </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Group controlId="formNewProduct">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name" />
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Save
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
            </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalNewProduct