import React, { useState, useEffect } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Grid, Card, CardMedia, CardContent, Divider } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../../../actions/orderAction';


const Review = ({handleBack, checkoutToken, addressData, orderData, submitOrder}) => {
  const classes = useStyles();
  const items = orderData.line_items;
  const [shippingFee, setShippingFee] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(orderData.payment.stripe.payment_method.card);

  useEffect(() => {
    checkoutToken.shipping_methods.forEach(method => {
      if(method.id === orderData.fulfillment.shipping_method)
        setShippingFee(method.price.raw);
    });
  }, []);

  useEffect(() => {
    setSubtotal(checkoutToken.live.subtotal.raw + shippingFee);
  }, [shippingFee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitOrder(checkoutToken.id, orderData);
  }
  
  return (
    <div className={classes.summary}>
      <Typography variant="h5" style={{textAlign:'center', fontWeight:'bold'}} >
        Order Summary
      </Typography>
      <Grid container style={{padding: '40px'}}>
        {items.map((item) => (
          <Card style={{display: 'flex', maxHeight:'100px', width:'100%', paddingBottom:'20px'}} elevation={0}>
            <CardMedia component='img' image={item.media.source} style={{maxWidth:'100px'}}/>
            <CardContent style={{display:'flex', width:'100%', justifyContent:'space-between', padding:'0', paddingLeft:'2%', paddingRight:'2%'}}>
              <CardContent className={classes.summary_itemDescription}>
                <Typography nowrap className={classes.summary_itemDescriptionText}>{item.name}</Typography>
                <Typography variant='subtitle2' className={classes.summary_itemDescriptionText} style={{color:'#888888'}}>Quantity: {item.quantity}</Typography>
              </CardContent>
              <CardContent className={classes.summary_itemDescription} style={{padding:'0'}}>
                <Typography className={classes.summary_itemDescriptionText}>{item.price.formatted_with_symbol}</Typography>
              </CardContent>
            </CardContent>
          </Card>
        ))}
        <Grid item gutterBottom xs={6}>
          <Typography>Shipping Fee</Typography>
        </Grid>
        <Grid item gutterBottom xs={6} style={{display:'flex', justifyContent:'end',paddingRight:'2%'}}>
          <Typography>$ {shippingFee}</Typography>
        </Grid>
      </Grid>

      <Grid container style={{paddingBottom:'30px'}}>
        <Grid item xs={12} style={{display: 'flex', justifyContent:'space-between'}}>
          <Typography variant='h5'>Subtotal: </Typography> 
          <Typography variant='h5'>$ {subtotal}</Typography>
        </Grid>
      </Grid>
      <Divider />
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping Information:
            </Typography>
            <Grid item xs={12}>
              <Typography gutterBottom>{addressData.firstname} {addressData.lastname}</Typography>
              <Typography gutterBottom>{addressData.phone}</Typography>
              <Typography gutterBottom>{addressData.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>{addressData.address1}</Typography>
              <Typography gutterBottom>{addressData.address2}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{addressData.city}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{addressData.shippingState}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{addressData.zip}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{addressData.shippingCountry}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Typography variant='h6' sx={{mt:2}}>
              Payment Method:
            </Typography>
            <Grid item xs={12}>
              <Typography gutterBottom>Card type: {paymentMethod.brand}</Typography>
              <Typography gutterBottom>Ending: {paymentMethod.last4}</Typography>
              <Typography gutterBottom>Expiry: {paymentMethod.exp_month}/{paymentMethod.exp_year}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{display:'flex', justifyContent:'space-between'}}>
          <Button variant='outlined' color='secondary' size='large' onClick={handleBack}>Back</Button>
          <Button variant='outlined' color='primary' size='large' onClick={(e) => handleSubmit(e)}>Place Order</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Review;