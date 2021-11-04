import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Avatar, Divider, CssBaseline, Grid, Paper, Step, Stepper, StepLabel, Typography, CircularProgress } from '@material-ui/core';
import AddressForm from './Address';
import PaymentForm from './Payment';
import Review from './Review';
import Confirmation from './Confirmation';
import useStyles from './styles';
import PaymentsIcon from '@material-ui/icons/Payment';
import { captureOrder, getOrderToken } from '../../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import PaymentError from './PaymentError';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = () => {
  const dispatch = useDispatch();
  const {token} = useParams();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState({});
  const [orderData, setOrderData] = useState({});
  const {checkoutToken, order, loading, error} = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderToken(token));
  }, []);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleAddress = (data) => {
    setAddressData(data);
    handleNext();
  }
  const handleOrderData = (order) => {
    setOrderData(order);
    handleNext();
  }
  const submitOrder = (checkoutTokenId, orderData) => {
    dispatch(captureOrder(checkoutTokenId, orderData));
    handleNext();
  }
  

  const getStepContent = (step) => {
    if(!loading && checkoutToken){
      switch (step) {
        case 0:
          return <AddressForm checkoutToken={checkoutToken} handleAddress={handleAddress} />;
        case 1:
          return <PaymentForm checkoutToken={checkoutToken} handleBack={handleBack} addressData={addressData} handleOrderData={handleOrderData} />;
        case 2:
          return <Review handleBack={handleBack} checkoutToken={checkoutToken} addressData={addressData} orderData={orderData} submitOrder={submitOrder} />;
        case 3:
          if(order){
            return <Confirmation order={order} />
          }
          else
            return <CircularProgress />
        default:
          throw new Error('Unknown step');
      };
    }
    else{
      return <CircularProgress />
    }
  };

  if(error){
    return (<PaymentError error={error} />)
  }

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square style={{padding:'30px'}}>
          <div className={classes.paper}>
            {
              order === null ? (
                <>
                  <Avatar className={classes.avatar}>
                    <PaymentsIcon />
                  </Avatar>
                  <Typography>
                    Check Out
                  </Typography>
                  <Divider className={classes.divider} />
                  <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {getStepContent(activeStep)}
                </>
              ) : (
                getStepContent(activeStep)
              )
            }
          </div>
        </Grid>
      </Grid>  
    </>
  );
}

export default Checkout;