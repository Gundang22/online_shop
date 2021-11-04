import { Button, Grid, CircularProgress } from "@material-ui/core";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import useStyles from "./styles";
import './Slide.css';

const Category = ({categories}) => {
    const classes = useStyles();

    const responsive = {
        0: {items:2},
        568: {items:3},
        1024: {items:4},
    }
    const items=[];

    if(!categories){
        return (
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
        )
    }
    
    categories.forEach(category => {
        items.push(
            <a href={`/catalog/category?categoryQuery=${category.id}`} style={{textDecoration:'none', color:'white'}}>
                <div className={classes.categorySlides} style={{backgroundImage:`url(${category.assets[0].url})`}}>
                    <Button variant='contained' className={classes.categorySlidesButton}>{category.name}</Button>
                </div>
            </a>
        )
    });

    return (
        <div className='category'>
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
            />
        </div>
    );
}

export default Category;