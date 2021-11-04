import React from 'react';

import {Card, CardMedia, CardContent, Typography} from '@material-ui/core'

import useStyles from './styles';

const Item = ({item}) => {
    const classes = useStyles();

    return (
        <a href={`/items/${item.id}`} style={{textDecoration:'none', textAlign:'center'}}>  
            <Card className={classes.card} elevation={0}>
                <CardMedia className={classes.media} image={item.media.source} title={item.name} style={{backgroundSize:'contain'}} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom style={{color:'white'}}>
                            {item.name}
                        </Typography>
                    </div>
                    <Typography variant='h5' style={{color:'orange'}}>
                        {item.price.formatted_with_symbol}
                    </Typography>
                </CardContent>
            </Card>
        </a>
    );
}

export default Item;