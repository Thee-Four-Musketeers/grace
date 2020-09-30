
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
            <Button variant="primary" onClick={handleShow}>
                <i className="fas fa-plus"></i> Add Product
        </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {
                        products && products.map(product => (
                            <EditProdForm
                                key={product.id}
                                {...product}>
                            </EditProdForm>
                        ))
                    } */}
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