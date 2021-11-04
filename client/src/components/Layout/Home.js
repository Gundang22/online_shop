import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from './Carousel';
import { getItems } from '../../actions/itemAction';
import {CircularProgress, Grid, Button, Typography, Divider, TextField, Paper} from '@material-ui/core'
import useStyles from './style';
import allProducts from '../../images/allProducts.jpg';
import clothes from '../../images/clothes.jpg';
import tools from '../../images/tools.jpg';
import electronics from '../../images/electronics.jpg';
import ArrowIcon from '@material-ui/icons/ArrowForward';

const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {items, loading} = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    if(loading || !items){
        return (
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
        )
    }
    const handleURL = (id) => {
        if(id === 'all') window.location.href = `/catalog`;
        else window.location.href = `/catalog/category?categoryQuery=${id}`;;
    }

    return (
        <>
            <Carousel />
            
            <Grid className={classes.catalog}>
                <Typography variant='h5' style={{textAlign:'center',fontFamily:'Courier New, monospace'}}>Catalog</Typography>
                <Divider className={classes.divider} />
                <Grid container style={{marginTop:'50px'}}>
                    <Grid item xs={6} sm={3} onClick={(e)=>handleURL('cat_zkK6oL431oXn0Q')} style={{backgroundImage:`url(${clothes})`}} className={classes.catalogItem}>
                        <a href='/catalog/category?categoryQuery=cat_zkK6oL431oXn0Q' style={{textDecoration:'none'}}>
                            <Button variant='contained' className={classes.catalogPaper}>
                                Clothes
                            </Button>
                        </a>
                    </Grid>
                    <Grid item xs={6} sm={3} onClick={(e)=>handleURL('cat_DWy4oGqYnl6Jx2')} style={{backgroundImage:`url(${tools})`}} className={classes.catalogItem}>
                        <a href='/catalog/category?categoryQuery=cat_DWy4oGqYnl6Jx2' style={{textDecoration:'none'}}>
                            <Button variant='contained' className={classes.catalogPaper}>
                                Tools
                            </Button>
                        </a>
                    </Grid>
                    
                        <Grid item xs={6} sm={3} onClick={(e)=>handleURL('cat_bWZ3l83Y45kpEQ')} style={{backgroundImage:`url(${electronics})`}} className={classes.catalogItem}>
                            <a href='/catalog/category?categoryQuery=cat_bWZ3l83Y45kpEQ' style={{textDecoration:'none'}}>
                                <Button variant='contained' className={classes.catalogPaper}>
                                    Electronics
                                </Button>
                            </a>
                        </Grid>
                    <Grid item xs={6} sm={3} onClick={(e)=>handleURL('all')} style={{backgroundImage:`url(${allProducts})`}} className={classes.catalogItem}>
                        <a href='/catalog' style={{textDecoration:'none'}}>
                            <Button variant='contained' className={classes.catalogPaper}>
                                All Products
                            </Button>
                        </a>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={classes.newsLetter}>
                <Typography variant='h4'>Stay Up to Date with Everything in Our World</Typography>
                <Typography>Subscribe to our newsletter</Typography>
                <Divider className={classes.divider} />
                <Grid className={classes.newsLetterInput}>
                    <TextField fullWidth variant='outlined'></TextField>
                    <Button><ArrowIcon /></Button>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;