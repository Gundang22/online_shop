import React,{useEffect} from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsPage } from '../../actions/itemAction';

import useStyles from './style';

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {numberOfPages} = useSelector((state) => state.items);
    
    useEffect(() => {
        if(page) dispatch(getItemsPage(page));
    }, [page]);

    return (
        <Pagination
            classes={{ul: classes.ul}}
            style={{justifyContent: 'center'}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/items?page=${item.page}`} style={{margin:'auto'}} />
            )}
        />
    );
}

export default Paginate;