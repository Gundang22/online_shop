import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import {Card, CardMedia, CardContent, Typography, IconButton, CardActions, Select, MenuItem, NativeSelect} from '@material-ui/core'
import AddShoppingCard from '@material-ui/icons/AddShoppingCart';

import useStyles from './styles';

const Item = ({item, addToCart}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [variants, setVariant] = useState(item.variant_groups);
    if(variants.length !== 0){
        variants[0].options.map((variant) => {
            console.log(variant)
        })
    }


    const handleVariant = () => {

    };

    const showDetail = () => {
        history.push(`/items/${item.id}`);
    };

    return (
        <>  
            <Card className={classes.card} onClick={showDetail}>
                <CardMedia className={classes.media} image={item.media.source} title={item.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {item.name}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{__html: item.description}} variant='body2' color='textSecondary' />
                    <Typography variant='h5' style={{color:'orange'}}>
                        {item.price.formatted_with_symbol}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default Item;