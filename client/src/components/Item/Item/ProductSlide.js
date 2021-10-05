import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ProductSlide = (image) => {
    const handleDragStart = (e) => e.preventDefault();

    const items = [
        <img style={{width:'100%'}} src={image.image.source} onDragStart={handleDragStart} />
    ]

    return (
        <AliceCarousel mouseTracking items={items} />
    )
}

export default ProductSlide;