import React, { useState } from 'react';
import {TextField, Button, Grid} from '@material-ui/core';
import useStyles from './styles'
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({value}) => {
    const classes = useStyles();
    const [search, setSearch] = useState(value);

    const handleSearch = () => {
        window.location.href = `/search/search?searchQuery=${search || 'none'}`;
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            handleSearch();
        }
    }

    return (
        <Grid className={classes.searchInput}>
            <TextField onKeyDown={handleKeyPress} className value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button onClick={handleSearch}>
                <SearchIcon />
            </Button>
        </Grid>
    );
}

export default SearchBar;