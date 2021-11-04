import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles';

const RelatedProductSlide = ({relatedProduct}) => {
    const handleDragStart = (e) => e.preventDefault();
    const classes = useStyles();
    const items = [];
    const responsive = {
        0: {items: 3},
        568: {items: 4},
        758: {items: 5},
    }

    if(relatedProduct){
        relatedProduct.map((item) => {
            items.push(
                <Grid style={{textAlign:'center'}}>
                    <a href={`/items/${item.id}`}>
                        <img className={classes.productSlideItems} src={item.assets[0].url} onDragStart={handleDragStart} style={{border:'1px solid', color: 'white'}} />
                    </a>
                    <Typography style={{textAlign:'center'}}>{item.name}</Typography>
                    <Typography style={{textAlign:'center', color:'green'}}>{item.price.formatted_with_symbol}</Typography>
                </Grid>
            )
        })
    }

    return (
        <div className='relatedProductSlide' style={{paddingBottom:'50px'}}>
            <AliceCarousel 
                autoPlay
                mouseTracking 
                items={items}
                responsive={responsive}
            />
        </div>
    );
}

export default RelatedProductSlide;