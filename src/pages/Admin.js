import React, { useEffect } from 'react';
import { Col, Tabs, Tab } from 'react-bootstrap';
import AdminProducts from '../components/AdminProducts';
import AdminOrders from '../components/AdminOrders';
import AdminUsers from '../components/AdminUsers';

import './Admin.css'

const Admin = ({ user, setUser, products, setProductType, setHeaderClass }) => {

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
                    <Tabs id="uncontrolled-tab-example">
                        <Tab eventKey="products" title="Products">
                            <AdminProducts products={products} />
                        </Tab>
                        <Tab eventKey="orders" title="Orders">
                            <AdminOrders />
                        </Tab>
                        <Tab eventKey="users" title="Users">
                        <AdminUsers user={user} setUser={setUser} />
                        </Tab>
                    </Tabs>    
                </>
                : <><div>Access Denied</div></>
            }
        </Col>
        </>


    )
}

export default Admin;