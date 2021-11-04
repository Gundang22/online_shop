import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Item from './Item/Item';
import { Grid, CircularProgress, Paper, Typography, Select, MenuItem } from '@material-ui/core';
import { addCart } from '../../actions/cartAction';
import Pagination from './Pagination';
import useStyles from './style';
import { useLocation, useHistory } from 'react-router';
import { getItemsPage, sortItems } from '../../actions/itemAction';

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

export const Items = ({items}) => {
    const location = window.location.pathname;
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') || 1;
    const sort = query.get('sort') || 'default';
    const [sortBy, setSortBy] = useState(sort);
    const {itemsPage, itemsSort, loading, numberOfPages} = useSelector((state) => state.items);

    useEffect(() => {
        if(items)
            dispatch(sortItems(items, sortBy))
    }, [sortBy])
    useEffect(() => {
        if(itemsSort)
            dispatch(getItemsPage(itemsSort, page));
    }, [itemsSort]);

    const addToCart = async(itemid, quantity) => {
        dispatch(addCart(itemid, quantity));
    }

    const handleSort = (value) => {
        setSortBy(value);
        history.push(`${location}?page=${page}&sort=${value}`)
    }

    if(!itemsPage || loading){
        return (
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
        )
    }


    return (
        <Container className='py-4'>
            <Typography variant='h5' style={{textAlign:'center', marginBottom:'30px'}}>Products</Typography>
            <Paper className={classes.sortPaper}>
                <Typography color='textSecondary' style={{display:'grid',alignContent:'center'}}>{items.length} results</Typography>
                <Grid>
                    Sort By 
                    <Select
                        id='sort'
                        value={sortBy}
                        defaultValue='Best Match'
                        onChange={(e) => handleSort(e.target.value)}
                        style={{marginLeft:'10px'}}
                    >
                        <MenuItem value={'default'}>Best Match</MenuItem>
                        <MenuItem value={'highlow'}>Price High-Low</MenuItem>
                        <MenuItem value={'lowhigh'}>Price Low-High</MenuItem>
                    </Select>
                </Grid>
            </Paper>
            <Row style={{width:'auto'}}>
                {
                    itemsPage.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <Item item={item} key={item.id} addToCart={addToCart} />
                        </Grid>
                    ))
                }
            </Row>
            <Pagination page={page} numberOfPages={numberOfPages} key={page} />
        </Container>
    );
}

export default Items;