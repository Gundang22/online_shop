import React, {useEffect, useState} from 'react';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import Review from './Review';
import { useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../../actions/orderAction';
import { commerce } from '../../../lib/commerce';

const Payment = ({checkoutToken, handleBack, addressData, handleOrderData}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleSubmit = async(e, elements, stripe) => {
    e.preventDefault();
    if(!stripe || !elements) return;
    try{
      const cardElement = elements.getElement(CardElement);
      const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
      if(error){
        console.log(error);
        return;
      };

      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: addressData.firstname, 
          lastname: addressData.lastname, 
          email:addressData.email, 
          phone: addressData.phone
        },
        shipping: {
          name: 'primary', 
          street: addressData.address1, 
          town_city: addressData.city, 
          county_state: addressData.shippingState, 
          postal_zip_code: addressData.zip, 
          country: addressData.shippingCountry
        },
        fulfillment: {
          shipping_method: addressData.shippingOption
        },
        payment: {
          gateway: 'stripe', 
          stripe: {payment_method_id: paymentMethod.id, payment_method: paymentMethod}
        }
      }

      handleOrderData(orderData);
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