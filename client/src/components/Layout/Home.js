import React, { useState } from 'react';
import Items from '../Item/Items';
import Carousel from './Carousel';
import Pagination from '../Item/Pagination';
import { useHistory, useLocation } from 'react-router';

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {
    const query = useQuery();
    const searchQuery = query.get('searchQuery');

    const page = query.get('page') || 1;

    return (
        <>
            <Carousel />
            <Items />
            <Pagination page={page} />
        </>
    );
}

export default Home;