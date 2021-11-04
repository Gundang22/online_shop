import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryItem } from '../../../actions/itemAction';
import { useParams } from 'react-router';
import Items from '../Items'
import useStyles from './styles';

const ItemCategory = () => {
    const dispatch = useDispatch()
    const classes = useStyles();

    const {id} = useParams();
    const {items, category, loading} = useSelector((state) => state.items);
    useEffect(() => {
        dispatch(getCategoryItem(id));
    }, []);

    if(loading || !category ){
        return (
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <Container fluid style={{padding: 0}}>
            {
                !category ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div style={{height: '300px', overflow:'hidden', display:'grid', alignContent:'center'}}>
                            <img src={category.assets[0]?.url} style={{width:'100%', minWidth:'800px'}} />
                        </div>
                        <Grid container className={classes.category}>
                            <Typography variant='h5' style={{margin:'auto'}}>{category.name}</Typography>
                        </Grid>
                    </>
                )
            }
            <Items items={items} key={id} />
        </Container>
    );
}

export default ItemCategory;