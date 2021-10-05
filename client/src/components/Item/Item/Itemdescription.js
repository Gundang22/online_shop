import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import {getItem} from '../../../actions/itemAction';
import { Paper, Typography, Link, Divider,Grid, Button, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ProductSlide from './ProductSlide';

const Description = () => {
    const {item, loading} = useSelector((state) => state.items);
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const classes = useStyles();

    const [selectedVariant, setSelectedVariant] = useState({});
    
    useEffect(() => {
        dispatch(getItem(id));
    }, []);

    useEffect(() => {
        if(item){
            item.variant_groups.map((variant) => {
                let variantGroup = variant.id;
                variant.options.map((option) => {
                    console.log(variantGroup,": '",option.id,"'")
                })
            })
        }
    }, [item])

    const back = () => {
        history.goBack();
    };

    // console.log(item);

    const variantButtons = (option) => {
        if(selectedVariant === option.id)
            return (
                <Button variant='contained' color='primary' style={{margin:'10px'}}>{option.name}</Button>
            )
        else
            return <Button variant='outlined' color='primary' style={{margin:'10px'}}>{option.name}</Button>
    }

    if(loading || !item){
        return (
            <>
                <div className={classes.itemDetailPaper}>
                    <Button variant='outlined' onClick={back}>
                        <KeyboardBackspaceIcon />
                    </Button>
                    <Divider style={{margin: '20px 0'}} />
                    <CircularProgress size='7em' />
                </div>
            </>
        );
    }
    
    return(
        <>
            <div className={classes.itemDetailPaper} >
                <Button variant='outlined' onClick={back}>
                    <KeyboardBackspaceIcon />
                </Button>
                <Divider style={{margin: '20px 0'}} />
                <Grid container spacing={4} style={{margin:'auto'}}>
                    <Grid item xs={11} sm={5}>
                        <ProductSlide image={item.media} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Grid item>
                            <Typography variant='h5' style={{fontWeight:'bold'}}>{item.name}</Typography>
                            <Typography>{item.price.formatted_with_symbol}</Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        {
                            item.variant_groups.map((variant) => (
                                <Grid item style={{marginTop:'10px'}}>
                                    <Typography>{variant.name}</Typography>
                                    <Grid container spacing={2} style={{paddingTop:'10px'}}>
                                        {variant.options.map((option) => variantButtons(option))}
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Typography dangerouslySetInnerHTML={{__html: item.description}}></Typography>
            </div>
        </>
    );
}

export default Description;