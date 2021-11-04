import React from "react";
import {Button, Carousel} from 'react-bootstrap';
import image1 from '../../images/image1.jpg'
import image2 from '../../images/image2.jpg'
import useStyles from './style';

function Carou(){
    const classes = useStyles();

    const images = [
        <img src={image1} className={classes.carousel} />,
        <img src={image2} className={classes.carousel} />,
    ];
    return(
        <Carousel fade touch nextLabel='' prevLabel=''>
            {images.map((image) => (
                <Carousel.Item interval={15000} key={image}>
                    {image}
                    <Carousel.Caption>
                        <a href='/catalog'>
                            <Button variant='dark' className={classes.carouselButton}>SHOP NOW</Button>
                        </a>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carou;