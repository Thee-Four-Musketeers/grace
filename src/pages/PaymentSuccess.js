import React from 'react';
import { Col } from 'react-bootstrap';


const PaymentSuccess = (user, setUser, setHeaderClass) => {

    // useEffect(() => {
    //     setHeaderClass('checkoutsuccess');
    // }, []);

    return (
        <>
            <Col id="content">
                {user
                    ?
                    <>
                        <div>
                            <h1>Thank you! We appreciate your business!</h1>
                            <p>Your payment was a success. Please allow 2-3 days for order processing.</p>
                            <p>All orders are sent by Next-Day Air in a cold package to ensure quality product upon arrival.
                            Please reach out via our 'contact us' link below with any questions, and be sure to include your order number.
                        </p>

                        </div>


                    </>
                    : <><div>Access Denied</div></>
                }


            </Col>
        </>
    )
}

export default PaymentSuccess;