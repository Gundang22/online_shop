import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import {getItem} from '../../../actions/itemAction';
import { Typography, Divider,Grid, Button, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ProductSlide from './ProductSlide';
import { addCart } from '../../../actions/cartAction';

const Description = () => {
    const {item, loading} = useSelector((state) => state.items);
    console.log(item);
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const classes = useStyles();

    const [selectedVariant, setSelectedVariant] = useState([]);
    
    useEffect(() => {
        dispatch(getItem(id));
    }, []);

    useEffect(() => {
        if(item){
            item.variant_groups.map((variant) => {
                let variants = selectedVariant;
                let variantGroup = variant.id;
                let variantSelect = variant.options[0].id;
                variants[variantGroup] = variantSelect
                setSelectedVariant({
                    ...selectedVariant,
                }); 
            })
        }
    }, [item]);

    const back = () => {
        history.goBack();
    };

    const renderVariants = () => {
        return(
            item.variant_groups.map((variantGroup) => (
                <Grid item style={{marginTop:'10px'}}>
                    <Typography>{variantGroup.name}:</Typography>
                    <Grid container spacing={2} style={{paddingTop:'10px'}}>
                        {variantGroup.options.map((option) => variantButtons(variantGroup, option))}
                    </Grid>
                </Grid>
            ))
        )
    }

    const variantButtons = (variantGroup, option) => {
        let selected = false;
        Object.values(selectedVariant).forEach(element => {
            if(element === option.id)
                selected = true;
        });
        if(selected)
            return <Button variant='contained' color='primary' style={{margin:'10px'}}>{option.name}</Button>
            
        else
            return <Button onClick={(e) => handleVariant(e, variantGroup, option)} variant='outlined' color='primary' style={{margin:'10px'}}>{option.name}</Button>
    }

    const handleVariant = (e, variantGroup, option) => {
        e.preventDefault();
        Object.keys(selectedVariant).map((variant) => {
            if(variant === variantGroup.id){
                setSelectedVariant({
                    ...selectedVariant,
                    [variant]: option.id,
                })
            }
        })
    }

    const handleAddItem = async() => {
        dispatch(addCart(item.id, selectedVariant));
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
                        <ProductSlide image={item.assets} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Grid item>
                            <Typography variant='h5' style={{fontWeight:'bold'}}>{item.name}</Typography>
                            <Typography>{item.price.formatted_with_symbol}</Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        {renderVariants()}
                        <Grid item className={classes.checkout}>
                            <Grid item>
                                <Button onClick={handleAddItem} variant='contained' style={{backgroundColor:'green', color:'white'}}>Add to cart</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.description}>
                    <Typography dangerouslySetInnerHTML={{__html: item.description}}></Typography>
                </Grid>
            </div>
        </>
    );
}

export default Description;