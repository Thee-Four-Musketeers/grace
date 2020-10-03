import React, { useEffect } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import ModalNewProduct from '../components/ModalNewProduct'
import ProductList from '../components/ProductList';
import AdminNav from '../components/AdminNav';

const Admin = ({ user, products, setProductType, setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('admin');
    }, []);

    useEffect(() => {
        setProductType(['cheese', 'meat', 'fruit', 'nut']);
    }, [])

    let admin = true;
    if (localStorage.getItem('user') && user.admin) {
        admin = true
    }

    
    return (
        <> 
        
        <Col id="content">
            { admin
                ? <>
                    <Row>
                        <Col>
                    
                            <Tabs id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Home">
                                <div>test</div>
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                                <div>does it work</div>
                            </Tab>
                            <Tab eventKey="contact" title="Contact">
                                <div>i hope so</div>
                            </Tab>
                            </Tabs>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col><ModalNewProduct /></Col>
                    </Row>

                    <Row>
                        <Col>

                            {
                                products && products.map(product => (
                                    <ProductList
                                        key={product.id}
                                        {...product}>
                                    </ProductList>)
                                )
                            }

                        </Col>
                    </Row>
                </>
                : <><div>Access Denied</div></>
            }
        </Col>
        </>


    )
}

export default Admin;