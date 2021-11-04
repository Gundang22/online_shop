import { List, IconButton, Collapse, CircularProgress, ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from './styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link} from 'react-router-dom'
import { commerce } from "../../lib/commerce";

const CategoryChild = ({cate, toggleDrawer}) => {
    const classes = useStyles();
    const [category, setCategory] = useState({});
    const [expand, setExpand] = useState(false);
    useEffect(() => {
        commerce.categories.retrieve(cate.id)
            .then((res) => {
                setCategory(res);
            })
    },[]);

    const handleExpand = () => {setExpand(!expand);}

    const handleCategory = () => {
        window.location.href = `/catalog/category?categoryQuery=${category.id}`;
    }

    if(!category || !category.children){
        return (
            <CircularProgress />
        )
    }

    return (
        <ListItem className={classes.categoryChild}>
            {
                category?.children?.length === 0 ? (
                    <ListItem className={classes.categoryLink} component={Link} onClick={handleCategory}>{category.name}</ListItem>
                ) : (
                    <List className={classes.dropdown}>
                        <ListItem button onClick={handleExpand}>
                            <ListItem className={classes.categoryLink} component={Link} onClick={handleCategory}>{category.name}</ListItem>
                            {expand ? (
                                <IconButton onClick={handleExpand}>
                                    <ExpandLess />
                                </IconButton>
                            ) : (
                                <IconButton onClick={handleExpand}>
                                    <ExpandMore />
                                </IconButton>
                            )}
                        </ListItem>
                        <Collapse in={expand} timeout='auto'>
                            <List component='div' disablePadding>
                                {
                                    category.children.map((cate) => (
                                        <CategoryChild cate={cate} toggleDrawer={toggleDrawer} key={cate.id} />
                                    ))
                                }
                            </List>
                        </Collapse>
                    </List>
                )
            }
        </ListItem>
    )
}

export default CategoryChild;