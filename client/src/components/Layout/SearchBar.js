import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { searchItem } from '../../actions/itemAction';
import ChipInput from 'material-ui-chip-input'
import {AppBar, TextField, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './style'

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleSearch = () => {
        if(search.trim()){
            dispatch(searchItem({ search, tags: tags.join(',') }));
            history.push(`/items/search?searchQuery=${search || 'none'}`)
        }
        else{
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            searchItem();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete));

    return (
        <div>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                    name='search' 
                    variant='outlined' 
                    label='Search Item'
                    onChange={(e) => {setSearch(e.target.value)}}
                    onKeyPress={handleKeyPress}
                />
                <ChipInput 
                    style={{margin: '10px 0'}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined"
                />
                <Button onClick={handleSearch} className={classes.searchButton} color="Primary" variant='contained'>Search</Button>
            </AppBar>
        </div>
    );
}

export default SearchBar;