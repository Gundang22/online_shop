import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions/orderAction';
import {Paper, Typography, Grid, CircularProgress, Avatar, CssBaseline} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import Order from './Order/Order';

const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {orders, loading, message} = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return(
        <>
            <Grid container component='main' className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} component={Paper} elevation={6} square>
                        {message === 'Access Denied' ? (
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Access Denied
                                </Typography>
                            </div>
                        ) : (
                            <Paper style={{margin:'auto', maxWidth:'1000px', padding:'30px',marginTop:'30px', marginBottom:'30px'}} elevation={6}>
                                <Typography variant='h4'>CURRENT ORDERS</Typography>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Typography className={classes.processing}>Order Number</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography className={classes.processing}>Name</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography className={classes.processing}>Email</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography className={classes.processing}>Order Date</Typography>
                                    </Grid>
                                </Grid>
                                {
                                    loading || orders === null ? (
                                        <Paper elevation={6} className={classes.loadingPaper}>
                                            <CircularProgress size='7em' />
                                        </Paper>
                                    ) : (
                                        orders.map((order) => <Order order={order} key={order._id} />)
                                    )
                                }
                            </Paper>
                        )}
                </Grid>
            </Grid>
        </>
    );
}

export default Orders;