import React, { useEffect, useState } from 'react';
import Items from '../Item/Items';
import Carousel from './Carousel';
import Pagination from '../Item/Pagination';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { commerce } from '../../lib/commerce';
import { Button } from 'react-bootstrap';

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {
    const query = useQuery();
    // const { items, message } = useSelector((state) => state.items);
    const searchQuery = query.get('searchQuery');

    const [cart, setCart] = useState([]);
    const fe = async() => {
        setCart(await commerce.cart.retrieve());
    }

    useEffect(() => {
        fe();
    }, []);

    const page = query.get('page') || 1;

    return (
        <>
            <Carousel />
            <Items cart={cart} setCart={setCart} />
            <Pagination page={page} />
        </>
    );
}

export default Home;