import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router';

import useStyles from './style';

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Paginate = ({page, numberOfPages}) => {
    const query = useQuery();
    console.log(query.get('sort'));
    const sort = query.get('sort') || null;
    const classes = useStyles();
    const location = window.location.pathname;

    const toPage = (e, item) => {
        e.preventDefault();
        if(sort)
            window.location.href = `${location}?page=${item.page}&sort=${sort}`;
        else
            window.location.href = `${location}?page=${item.page}`;
    }
    return (
        <Pagination
            classes={{ul: classes.ul}}
            style={{justifyContent: 'center',marginTop:'40px',marginBottom:'40px'}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} onClick={(e) => toPage(e, item)} style={{margin:'auto'}} />
            )}
        />
    );
}

export default Paginate;