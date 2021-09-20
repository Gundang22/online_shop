import React, { useState, useRef, useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import image from '../../images/image1.jpg'

function Carou(){
    return(
        <Carousel fade prevLabel={""} nextLabel={""} style={{maxHeight: '800px'}}>
            <Carousel.Item style={{maxHeight: '800px'}}>
                <img className="d-block w-100" src={image} alt="First Slide"></img>
                <Carousel.Caption>
                    <h1>123</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{maxHeight: '800px'}}>
                <img className="d-block w-100" src={image} alt="Second Slide"></img>
                <Carousel.Caption>
                    <h1>234</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{maxHeight: '800px'}}>
                <img className="d-block w-100" src={image} alt="Third Slide"></img>
                <Carousel.Caption>
                    <h1>345</h1>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carou;