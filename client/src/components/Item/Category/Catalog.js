import { Grid, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getCategoryItem, getItems, itemsSetClear } from "../../../actions/itemAction";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";
import Category from "./Category";
import Items from "../Items";
import ErrorPage from "../../Layout/ErrorPage";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Catalog = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const query = useQuery();
    const cataQuery = query.get('categoryQuery') || 'all';
    const [allCate, setAllCate] = useState(null);
    const [error, setError] = useState(null);
    const {items, category, children, loading} = useSelector((state) => state.items);
    useEffect(() => {
        dispatch(itemsSetClear());
        fetchCategory();
    }, [cataQuery]);

    const fetchCategory = async() => {
        if(cataQuery === 'all'){
            setAllCate(await commerce.categories.list());
            dispatch(getItems());
        }
        else{
            try{
                let currentCate = await commerce.categories.retrieve(cataQuery);
                dispatch(getCategoryItem(currentCate.id));
                setAllCate(null);
            }
            catch(err){
                setError(err);
            }
        }
    }

    if(error){
        return(
            <ErrorPage error={error} />
        )
    }

    if(loading || (!children && !allCate)){
        return (
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <Grid className={classes.catalog}>
            {
                !(children?.length === 0 || allCate?.data?.length === 0) ? (
                    <>
                        <Grid className={classes.catalogName}>
                            {
                                category ? (
                                    <Typography variant='h5'>{category.name}</Typography>
                                ) : (
                                    <Typography variant='h5'>All Products</Typography>
                                )
                            }
                        </Grid>
                        {allCate ? (
                            <Grid className={classes.catalogFeatured}>
                                <Typography variant='h6' style={{paddingBottom:'30px'}}>Featured Categories</Typography>
                                <Category categories={allCate.data} />
                            </Grid>
                            
                        ) : (
                            <Grid className={classes.catalogFeatured}>
                                <Typography variant='h6'>Featured Categories</Typography>
                                <Category categories={children} />
                            </Grid>
                        )}
                    </>
                ) : (
                    <>
                        <div style={{height: '300px', overflow:'hidden', display:'grid', alignContent:'center'}}>
                            <img src={category.assets[0]?.url} style={{width:'100%', minWidth:'800px'}} alt={category.id} />
                        </div>
                        <Grid container className={classes.category}>
                            <Typography variant='h5' style={{margin:'auto'}}>{category.name}</Typography>
                        </Grid>
                    </>
                )
            }
            <Items items={items} />
        </Grid>
    );
}

export default Catalog;