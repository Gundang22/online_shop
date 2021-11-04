import { ListItem, List, ListItemText, Collapse, IconButton } from "@material-ui/core";
import React, {useState} from "react";
import useStyles from './styles';
import {Link} from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryChild from "./CategoryChild";

const Category = ({category, toggleDrawer}) => {
    const classes = useStyles();
    const [expand, setExpand] = useState(false);

    const handleExpand = () =>{setExpand(!expand);}

    const handleCategory = () => {
        window.location.href = `/catalog/category?categoryQuery=${category.id}`;
    }

    return (
        <ListItem className={classes.categoryParent}>
            {
                category?.children?.length === 0 ? (
                    <>
                        <ListItem className={classes.categoryLink} component={Link} onClick={handleCategory}>{category.name}</ListItem>
                    </>
                ) : (
                    <List className={classes.dropdown}>
                        <ListItem >
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

export default Category;