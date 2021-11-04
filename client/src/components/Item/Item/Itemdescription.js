import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {getItem, getRelatedProducts} from '../../../actions/itemAction';
import { Typography, Divider,Grid, Button, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import ProductSlide from './ProductSlide';
import { addCart } from '../../../actions/cartAction';
import './Slide.css'
import RelatedProductSlide from './RelatedProductSlide';
import ErrorPage from '../../Layout/ErrorPage';
import { Toast } from 'react-bootstrap';

const Description = () => {
    const {item, relatedItems, loading, error} = useSelector((state) => state.items);
    const {message} = useSelector((state) => state.cartItem);
    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();

    const [selectedVariant, setSelectedVariant] = useState([]);
    const [showToast, setShowToast] = useState(false);
    
    useEffect(() => {
        dispatch(getItem(id));
        dispatch(getRelatedProducts(id));
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

    useEffect(() => {
        setShowToast(true);
    }, [message]);

    const renderVariants = () => {
        return(
            item.variant_groups.map((variantGroup) => (
                <Grid item style={{marginTop:'10px'}} key={variantGroup.id}>
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

    if(error){
        return(
            <ErrorPage error={error} />
        )
    }

    if(loading || !item || !relatedItems){
        return (
            <>
                <div className={classes.itemDetailPaper}>
                    <Divider style={{margin: '20px 0'}} />
                    <CircularProgress size='7em' />
                </div>
            </>
        );
    }
    
    return(
        <>
            {
                message && 
                <Toast className="text-center bg-success" style={{position:"fixed", width:"180px", top:'30px', right:'30px', color:'#FF090960000', zIndex:'10'}} onClose={() => setShowToast(false)} show={showToast} delay = {3000} autohide>
                    <Toast.Body>
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>
            }
            <div className={classes.itemDetailPaper} >
                <Divider style={{margin: '20px 0'}} />
                <Grid container spacing={4}>
                    <Grid item xs={11} sm={7}>
                        <ProductSlide image={item.assets} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Grid item>
                            <Typography variant='h5' style={{fontWeight:'bold'}}>{item.name}</Typography><br/>
                            <Typography style={{color: 'green'}}>{item.price.formatted_with_symbol}</Typography>
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
                    <Typography variant='h5' style={{paddingBottom: '20px', fontWeight:'bold'}}>Overview</Typography>
                    <Typography dangerouslySetInnerHTML={{__html: item.description}}></Typography>
                </Grid>
                {
                    relatedItems.length !== 0 && 
                    <Grid className={classes.related}>
                        <Typography variant='h5' style={{textAlign:'center', paddingBottom:'20px'}}>Related Products</Typography>
                        <Grid className='slide'>
                            <RelatedProductSlide relatedProduct={relatedItems} />
                        </Grid>
                    </Grid>
                }
                
            </div>
        </>
    );
}

export default Description;