
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import ModalNewProduct from '../components/ModalNewProduct'
import OrderList from '../components/OrderList';
import { fetchOrders } from '../api';
import '../components/ProductList.css'



const AdminOrders = ({ user, setUser }) => {

    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        fetchOrders()
            .then(response => {
                setOrders(response.orders)
            })
    }, [])



    return (
        <>
            <Row>
                <Col><ModalNewProduct /></Col>
            </Row>
            <Row>
                <Col>
                {
                    orders && orders.map(order => (
                        <OrderList
                            key={order.id}
                            {...order}>
                        </OrderList>)
                    )
                }
                </Col>
            </Row>
        </>
    )
};

export default AdminOrders;