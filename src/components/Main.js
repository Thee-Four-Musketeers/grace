import React from 'react';
import './Main.css'

const Main = () => {
    return (
        <>
            <div className="heroWrapper">
                <img className="heroImage" alt="Cheeseplate" src="images/Hero_CheesePlate_1.jpg" />
                <div className="clearfix"></div>
                <img className="heroImage" src="images/Cheeseplate2.jpg" alt="Cheeseplate2" />
            </div>
        </>
    )
}

export default Main;