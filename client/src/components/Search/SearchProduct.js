import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getSearchItems } from "../../actions/itemAction";
import { Divider,CircularProgress, Grid, Typography} from '@material-ui/core';
import Items from "../Item/Items";
import useStyles from './styles';
import SearchBar from "./SearchBar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchProducts = () => {
    const classes = useStyles();
    const query = useQuery();
    const searchQuery = query.get('searchQuery');
    const dispatch = useDispatch();
    const {items, loading} = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(getSearchItems(searchQuery));
    }, []);


    if(loading || !items){
        return (
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
        )
    }
    if(items.length === 0){
        return(
            <Grid>
                <Grid className={classes.search}>
                    <Typography variant='h5'>Your search for "{searchQuery}" did not yield any results.</Typography>
                    <Divider className={classes.divider} />
                </Grid>
                <SearchBar value={searchQuery} />
            </Grid>
        )
    }

    return (
        <Grid>
            <Grid className={classes.search}>
                <Typography variant='h5'>Your search for "{searchQuery}" revealed the following:</Typography>
                <Divider className={classes.divider} />
            </Grid>
            <SearchBar value={searchQuery} />
            <Items items={items} />
        </Grid>
    );
}

export default SearchProducts;