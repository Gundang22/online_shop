import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Avatar, Button, CssBaseline, Grid, Paper, Step, Stepper, StepLabel, Typography, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AddressForm from './Address';
import PaymentForm from './Payment';
import Review from './Review';
import useStyles from './styles';
import PaymentsIcon from '@material-ui/icons/Payment';
import { getOneOrder } from '../../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = () => {
  const dispatch = useDispatch();
  const {orderId} = useParams();
  const {orders, loading, clientMessage} = useSelector((state) => state.orders);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState({
    fname: '',
    lname: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState('');

  useEffect(() => {
    dispatch(getOneOrder(orderId));
  },[]);


  if(!orders){
    return (
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square style={{padding:'30px'}}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">The Payment Page Has Expired.</Typography>
          </div>
        </Grid>
      </Grid>
      
    )
  }
  const s = () => {
    console.log(paymentInfo.last4)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm activeStep={activeStep} setActiveStep={setActiveStep} addressData={addressData} setAddressData={setAddressData} />;
      case 1:
        return <PaymentForm activeStep={activeStep} setActiveStep={setActiveStep} order={orders} addressData={addressData} setPaymentInfo={setPaymentInfo} />;
      case 2:
        return <Review activeStep={activeStep} setActiveStep={setActiveStep} addressData={addressData} paymentInfo={paymentInfo} />;
      default:
        throw new Error('Unknown step');
    };
  };

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <Button onClick={s}>123</Button>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square style={{padding:'30px'}}>
          <div className={classes.paper}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Avatar className={classes.avatar}>
                  <PaymentsIcon />
                </Avatar>
                <Typography>
                  Check Out
                </Typography>
                <Stepper activeStep={activeStep}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {getStepContent(activeStep)}
              </>
            )}
          </div>
        </Grid>
      </Grid>  
    </>
  );
}

export default Checkout;