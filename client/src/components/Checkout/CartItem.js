import React from 'react';
import {Grid, Paper, Typography, Button, IconButton} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';

const Cart = ({item, updateQuantity, remove}) => {
    const classes = useStyles();
    const variants = item.selected_options;

    return (
        <>
            <Paper elevation={6} className={classes.itemPaper}>
                <Grid container wrap='nowrap' spacing={2}>
                    <Grid item>
                        <img className={classes.media} src={item.media.source} alt={item.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container display='fixed' nowrap='true' spacing={2}>
                            <Grid item xs={12} sm={7} zeroMinWidth height='48px'>
                                <Typography className={classes.itemName}>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={0} sm={2} className={classes.priceSm}>
                                <Typography variant='primary' style={{color:'#CD390A'}}>${item.price.formatted}</Typography>
                            </Grid>
                            <Grid item xs={0} sm={3} className={`${classes.priceSm} ${classes.qty}`}>
                                <Button className={classes.qtybutton} style={{paddingBottom:'5px'}} type='button' size='small' onClick={() => updateQuantity(item.id, item.quantity-1)}>-</Button>
                                <Typography variant='colorTextSecondary'>{item.quantity}</Typography>
                                <Button className={classes.qtybutton} type='button' size='small' onClick={() => updateQuantity(item.id, item.quantity+1)}>+</Button>
                            </Grid>
                            <Grid item sm={10} className={classes.priceSm} style={{display:'grid'}}>
                                {
                                    variants && (
                                        variants.map((variant) => (
                                            <Typography variant='colorTextSecondary'>{variant.option_name}</Typography>
                                        ))
                                    )
                                }
                            </Grid>
                            <Grid item sm={2} style={{textAlign:'center'}}>
                                <IconButton aria-label='delete' onClick={() => remove(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid container>
                    <Grid item xs={6} className={classes.priceXs}>
                        <Typography variant='colorTextSecondary'>Price: </Typography>
                        <Typography style={{color:'#CD390A'}}>${item.price.raw}</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.priceXs}>
                        <Typography variant='colorTextSecondary' display='block'>Quantity:</Typography>
                        <Button className={classes.qtybutton} style={{paddingBottom:'5px'}} type='button' size='small' onClick={() => updateQuantity(item.id, item.quantity-1)}>-</Button>
                        <Typography variant='colorTextSecondary'>{item.quantity}</Typography>
                        <Button className={classes.qtybutton} type='button' size='small' onClick={() => updateQuantity(item.id, item.quantity+1)}>+</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Cart;