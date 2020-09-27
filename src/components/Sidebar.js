import React from 'react';
import { Col } from 'react-bootstrap';

import './Sidebar.css'

const Sidebar = () => {

    return (
        <Col id="sidebar" className="col-pixel-width-360 col-xl-12">
            <h4 className="title">Sidebar</h4>
            <div>Filters Go Here</div> 
            <div>Possibly Own Component</div>
            <div>Consider List Of Links</div>
            <div>Instead Of Drop Downs</div>
        </Col>       
    );
    
};

export default Sidebar;