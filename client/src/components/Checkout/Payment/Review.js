import React from 'react';
import { Button, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../../../actions/orderAction';

const items = [
  {
    name: 'Product 1',
    quantity: 1,
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    quantity: 1,
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    quantity: 1,
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    quantity: 1,
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const Review = ({activeStep, setActiveStep, addressData, paymentInfo}) => {
  const classes = useStyles();
  const address = addressData.address1+', '+addressData.city+', '+addressData.state+', '+addressData.zip+', '+addressData.country;
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  console.log(paymentInfo)
  
  return (
    <div>
      <Typography variant="h6" >
        Order Summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.name} secondary={item.desc} />
            <ListItemText primary={item.quantity} secondary={item.price} style={{textAlign:'end'}} />
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addressData.fname} {addressData.lname}</Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Grid className={classes.payment}>
            <Typography gutterBottom>Card Holder: </Typography>
            <Typography gutterBottom>{paymentInfo.name}</Typography>
          </Grid>
          <Grid className={classes.payment}>
            <Typography gutterBottom>Card No: </Typography>
            <Typography gutterBottom>{paymentInfo.cardno}</Typography>
          </Grid>
          <Grid className={classes.payment}>
            <Typography gutterBottom>Expiry Date: </Typography>
            <Typography gutterBottom>{paymentInfo.expire}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{display:'flex', justifyContent:'space-between'}}>
          <Button variant='outlined' color='secondary' size='large' onClick={handleBack}>Back</Button>
          <Button type='submit' variant='outlined' color='primary' size='large'>Place Order</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Review;