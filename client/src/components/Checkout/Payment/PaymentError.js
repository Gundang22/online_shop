import React from 'react';
import { Button, Grid, CssBaseline, Typography, Avatar, Divider, Paper } from '@material-ui/core';
import useStyles from './styles';
import BlockIcon from '@material-ui/icons/Block'
import { useHistory } from 'react-router';

const PaymentError = ({error}) => {
    const classes = useStyles();
    const history = useHistory();
    const backToHome = () => {
        history.push('/');
    }
    return (
        <>
          <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} component={Paper} elevation={6} square style={{padding:'30px'}}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <BlockIcon />
                </Avatar>
                <Typography variant='h5'>Payment Declined</Typography>
                <Divider className={classes.divider} />
                <Typography className={classes.confirmationText}>Your Payment Was Declined...</Typography>
                <Typography className={classes.confirmationText}>{error.data.error.message}</Typography>
                <Button variant='contained' color='primary' onClick={backToHome}>Back to home</Button>
              </div>
            </Grid>
          </Grid>  
        </>
    );
}

export default PaymentError;