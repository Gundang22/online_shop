import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import useStyles from './styles';

const ProductSlide = ({image}) => {
    const classes = useStyles();
    const items = [];

    console.log(image);

    image.map((item) => {
        items.push(
            <div className={classes.productSlideImage} style={{backgroundImage:`url(${item.url})`}}></div>
        );
    });

    return (
        <div className='productSlide'>
            <AliceCarousel
                mouseTracking 
                items={items}
            />
        </div>
    )
}

export default ProductSlide;