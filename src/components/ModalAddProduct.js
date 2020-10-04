
import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

import './ModalLogin.css'

const ModalAddProduct = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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
                        <Row>
                           <Col className="col-md-6">
                                <Form.Group className="form-group">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product name" />
                                </Form.Group>
                            </Col>
                            <Col className="col-md-6">
                                <Form.Group className="form-group">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="numeric" placeholder="$0.00" />
                                </Form.Group>
                            </Col>
                            <Col className="col-md-6">
                                <Form.Group className="form-group">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select">
                                        <option>cheese</option>
                                        <option>meat</option>
                                        <option>fruit</option>
                                        <option>nut</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="col-md-6">
                                <Form.File id="formProductImage" label="Image URL" />
                            </Col>
                            <Col className="col-md-12">
                                <Form.Group className="form-group">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="4" placeholder="Enter product description" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="btn-enter" variant="secondary" onClick={handleClose}>Save Product</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </>

    )
}

export default ModalAddProduct