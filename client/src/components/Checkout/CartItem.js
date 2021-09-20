import React from 'react';
import { useDispatch } from 'react-redux';
import {Grid, Paper, Typography, Button, IconButton} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteCartItem} from '../../actions/cartAction';

const Cart = ({item}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const remove = () => {
        dispatch(deleteCartItem(item));
    }

    return (
        <>
            <Paper elevation={6} className={classes.itemPaper}>
                <Grid container wrap='nowrap' spacing={2}>
                    <Grid item>
                        <img className={classes.media} src={item.imageURL} alt='image' />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container display='fixed' nowrap='true' spacing={2}>
                            <Grid item xs={7} sm={7} zeroMinWidth height='48px'>
                                <Typography className={classes.itemName}>some item some item description description some item description </Typography>
                            </Grid>
                            <Grid item xs={0} sm={2} className={classes.priceSm}>
                                <Typography variant='primary' style={{color:'#CD390A'}}>${item.price}</Typography>
                            </Grid>
                            <Grid item xs={0} sm={2} className={classes.priceSm}>
                                <Typography variant='colorTextSecondary'>{item.quantity}</Typography>
                            </Grid>
                            <Grid item sm={9} display='flex' />
                            <Grid item style={{padding: '0', paddingTop:'5px'}}>
                                <IconButton aria-label='delete' onClick={remove}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid container style={{marginLeft:'10px'}}>
                    <Grid item xs={6} className={classes.priceXs}>
                        <Typography variant='colorTextSecondary'>Price:</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.priceXs}>
                        <Typography variant='colorTextSecondary'>Quantity:</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Cart;