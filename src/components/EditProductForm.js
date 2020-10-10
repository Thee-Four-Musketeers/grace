
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
// import { fetchProductById } from '../api/index';
// import { useParams } from 'react-router-dom';


const EditProdForm = (
    products,
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
    // const [product, setProduct] = useState({})
    // const productId = useParams().id

    // useEffect(() => {

    //     async function fetchProduct() {
    //         const result = await fetchProductById(productId);
    //         setProduct(result.product[0]);
    //         console.log('product from product page', result)
    //     }
    //     fetchProduct();
    // }, []);

    return (
        <>
            {/* { product && */}
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
                    <Col className="col-md-6">
                        <Form.Group className="form-group">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control type="text" placeholder="Enter product origin" />
                        </Form.Group>
                    </Col>
                    <Col className="col-md-6">
                        <Form.Group className="form-group">
                            <Form.Label>Hardness</Form.Label>
                            <Form.Control type="text" placeholder="Enter product hardness" />
                        </Form.Group>
                    </Col>
                    <Col className="col-md-6">
                        <Form.Group className="form-group">
                            <Form.Label>Odor</Form.Label>
                            <Form.Control type="numeric" placeholder="Enter product odor" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {/* } */}
        </>
    )
}

export default EditProdForm;