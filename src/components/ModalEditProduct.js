
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditProdForm from './EditProductForm'

const ModalEditProduct = (products, setProductType) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     setProductType(['']);
    // }, [])

    const onChange = (update) => (event) => {
        event.preventDefault();
        update(event.target.value)
    }


    return (
        <>
            <Link onClick={handleShow}> Edit</Link>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProdForm />
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

export default ModalEditProduct