import React, { useState } from "react";
import styled from "@emotion/styled";
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
// import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";

const Button = styled.button`
display: block;
height: 40px;
width: 100%;
font-size: inherit;
font-weight: 600;
  cursor: pointer;
  background: rgb(179, 99, 2);
  border-radius: 4px;
  color: white;

  &: hover {
      background: cadetblue;
      text-decoration: none
  }
`;

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  & 
  .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const elements = useElements();
    const stripe = useStripe();

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        setProcessingTo(true);

        const billingDetails = {
            name: ev.target.name.value,
            email: ev.target.email.value,
            address: {
                city: ev.target.city.value,
                line1: ev.target.address.value,
                state: ev.target.state.value,
                postal_code: ev.target.zip.value
            }
        };

        const cardElement = elements.getElement(CardElement);

        const { paymentMethodReq } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails
        });
        console.log('CardElement Payment Method', paymentMethodReq)

        const { data: clientSecret } = await axios.post('../api/payment_intents.js', {
            amount: price
        })
        console.log('Payment Method', clientSecret)


        const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethodReq.paymentMethod.id,
        });
        console.log('Confirmed Card Payment: ', confirmedCardPayment)

        onSuccessfulCheckout();
    }


    const CardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: 'black',
                backgroundColor: '#ffffff'
            },
            completed: {}
        },
        hidePostalCode: true
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <div className="checkoutTitle">Billing/Shipping information:</div>

            <Row>
                <BillingDetailsFields />
            </Row>
            <div className="checkoutTitle">Card information:</div>

            <Row >

                <CardElementContainer>
                    <CardElement options={CardElementOptions} />
                </CardElementContainer>
            </Row>
            {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
            {/* <Row>
                <SubmitButton disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay $${price}`}
                </SubmitButton>
            </Row> */}
            <Link to={'/success'} > <Button>{`Pay $${price}`}</Button></Link>
        </form>
    );
};

export default CheckoutForm;
