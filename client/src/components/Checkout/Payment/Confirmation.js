import { Button, Typography, Avatar, Divider, Grid } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import React from 'react';
import useStyles from './styles';
import Block from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const Confirmation = ({order}) => {
    const classes = useStyles();
    const history = useHistory();

    const backToHome = () => {
        history.push('/');
    }
    if(!order){
        return (
            <>
                <Avatar className={classes.avatar}>
                    <Block />
                </Avatar>
                <Typography>Oops, Something Went Wrong...</Typography>
                <Typography>Please verify your payment information and try again later...</Typography>
            </>
        );
    }
    
    return  (
        <>
            <Avatar className={classes.avatar}>
                <CheckCircleOutlineIcon />
            </Avatar>
            <Grid className={classes.confirmationGrid}>
                <Typography variant='h5'>
                    Confirmation
                </Typography>
                <Divider className={classes.divider} />
                <Typography className={classes.confirmationText} variant='h5' style={{fontWeight:'bold'}}>Thank You For Your Purchasing!</Typography>
                <Typography className={classes.confirmationText} variant='h5'>Your order was completed successfully.</Typography>
                <Typography className={classes.confirmationText}>Confirmation Number: #{order.customer_reference}</Typography>
                <Grid container style={{paddingTop:'6px', paddingBottom:'50px'}}>
                    <Grid item xs={12} sm={3}>
                        <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/50/000000/external-mail-interface-kiranshastry-solid-kiranshastry.png"/>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography style={{textAlign:'left'}}>We will shortly provide you an email including invoice and order summary.</Typography>
                    </Grid>
                </Grid>
                <Button variant='contained' color='primary' onClick={backToHome}>Back to home</Button>
            </Grid>
            
        </>
    )
}

export default Confirmation;