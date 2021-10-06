import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Cart from './CartItem';
import { Alert } from 'react-bootstrap';
import { Container, Button, Typography } from '@material-ui/core';
import {CircularProgress} from '@material-ui/core';
import {postOrder} from '../../actions/orderAction';
import {getCart, updateQty, deleteCartItem} from '../../actions/cartAction';
import { Toast } from 'react-bootstrap';
import {Grid} from '@material-ui/core'

function Checkout(){
    const dispatch = useDispatch();
    const history = useHistory();
    var shipping = 9.99;
    
    const { cart, loading, message } = useSelector((state) => state.cartItem);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setShowToast(true);
    }, [message]);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    console.log(cart);

    const updateQuantity = (itemid, quantity) => {
        dispatch(updateQty(itemid, quantity));
    };
    const remove = (itemid) => {
        dispatch(deleteCartItem(itemid));
    };

    useEffect(() => {
        if(!loading){
            if(cart?.subtotal.raw >= 60) shipping = 0;
            else shipping = 9.99;
            document.getElementById('shipping').innerHTML = '$ '+shipping.toFixed(2);
        }
    }, [cart]);

    const orderHandler = () => {
        dispatch(postOrder(cart, history));
    }

    return (
        <div>
            <Alert className="d-flex justify-content-center bg-info font-weight-bold my-0 py-1">Free Shipping On Orders Over $60.00</Alert>
            <Container className="py-5">
                {
                    message && 
                    <Toast className="text-center bg-success" style={{position:"fixed", width:"180px", top:'30px', right:'30px', color:'#FF090960000', zIndex:'10'}} onClose={() => setShowToast(false)} show={showToast} delay = {3000} autohide>
                        <Toast.Body>
                            <strong>{message}</strong>
                        </Toast.Body>
                    </Toast>
                }
                <h1 className='text-center'>Your Cart</h1>
                <hr />
                {
                    loading || cart === undefined ? 
                    (
                        <CircularProgress />
                    ) : (
                        cart?.line_items.length === 0 ? 
                        (
                            <>
                                <p style={{textAlign:'center'}}>Oops... Seems like your cart is empty.</p>
                                <p style={{textAlign:'center'}}>Let's go explore and add a view items to cart.</p>
                            </>
                        ) : (
                                cart.line_items.map((item) => (
                                    <Grid item key={item.id}>
                                        <Cart item={item} updateQuantity={updateQuantity} remove={remove} />
                                    </Grid>
                                ))
                                    
                        )
                    )
                }
                <hr />
                <Container style={{maxWidth:'732px'}}>
                    <Typography color='textSecondary' style={{float:'right'}}>${cart?.subtotal.formatted}</Typography>
                    <Typography color='textSecondary'>TOTAL:</Typography>
                    <Typography id='shipping' color='textSecondary' style={{float:'right'}}>${shipping.toFixed(2)}</Typography>
                    <Typography color='textSecondary'>SHIPPING:</Typography>
                    <Typography color='textPrimary' variant='h5' style={{float:'right'}}>${cart?.subtotal.formatted}</Typography>
                    <Typography color='textPrimary' variant='h5'>Subtotal:</Typography>
                    <Button onClick={orderHandler} variant='contained' color='primary' disabled={loading} style={{float:'right', marginTop:'30px'}}>Check Out</Button>
                </Container>
            </Container>
        </div>
    );
}

export default Checkout;