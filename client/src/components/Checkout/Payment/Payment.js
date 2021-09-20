import React, {useState} from 'react';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import Review from './Review';

const Payment = ({activeStep, setActiveStep, order, addressData, setPaymentInfo}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  console.log(order);

  const handleSubmit = async(e, elements, stripe) => {
    e.preventDefault();
    if(!stripe || !elements) return;
    try{
      const cardElement = elements.getElement(CardElement);
      const {paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
      const orderData = {
        line_items: order.items,
        customer: {firstname: addressData.fname, lastname: addressData.lname, email: order.user.email},
        shipping: {name: addressData.fname+' '+addressData.lname, address_line1: addressData.address1, address_line2: addressData.address2, town_city: addressData.city, county_state: addressData.state, postal_zip_code: addressData.zip, country: addressData.country},
        fulfillment: {shipping_method: '123shippingmethod'},
        payment: {gateway: 'stripe', 
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      setPaymentInfo(orderData);
      setActiveStep(activeStep + 1);
    } catch(err){
      console.log(err,",!!!");
    }
  }
  
  return (
    <>
      <Typography variant="h6">Payment Information</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)} style={{width:'100%', padding:'40px'}}>
              <Typography variant='subtitle2'>*Please use 4242 4242 4242 4242 for the card number, and random numbers for the other fields.</Typography><br/><br/>
              <CardElement /><br/><br/>
              <Typography variant='caption'>*Please don't use your own card (although it's safe) for the payment detail as this is only a demo website.</Typography><br/><br/>
              <Grid item xs={12} style={{display:'flex', justifyContent:'space-between'}}>
                <Button variant='outlined' color='secondary' size='large' onClick={handleBack}>Back</Button>
                <Button type='submit' variant='outlined' color='primary' size='large' disabled={!stripe}>Next</Button>
              </Grid>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}

export default Payment;