import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Cart from './CartItem';
import { Alert } from 'react-bootstrap';
import { Container, Button, Typography } from '@material-ui/core';
import {CircularProgress} from '@material-ui/core';
import useStyles from './styles';
import {postOrder} from '../../actions/orderAction';
import {getCart} from '../../actions/cartAction';
import { Toast } from 'react-bootstrap';

function Checkout(){
    const history = useHistory();
    var shipping = 9.99;
    var total = 0;
    var subtotal = 0;
    const classes = useStyles();
    const dispatch = useDispatch();
    const userToken = JSON.parse(localStorage.getItem('profile'))?.result;
    const { items, loading, message } = useSelector((state) => state.cartItem);
    const [showToast, setShowToast] = useState(false);

    if(!loading && items !== null){
        items.forEach(item => {
            total += item.price * item.quantity;
        });
        if(total === 0)
            shipping = 0;
        else if (total < 60)
            shipping = 9.99;
        else if(total >= 60)
            shipping = 0;
        subtotal = total + shipping;
    };

    useEffect(() => {
        if(localStorage.getItem('profile') !== null){
            dispatch(getCart());
        }
    }, [dispatch]);

    const orderHandler = () => {
        dispatch(postOrder(items, history));
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
                    !userToken ?
                    (
                        <p style={{textAlign:'center'}}>
                            You must be logged in to view your cart...
                        </p>
                    ) : (
                        loading || items === null ? 
                        (
                            <CircularProgress />
                        ) : (
                            items.length === 0 ? 
                            (
                                <>
                                    <p style={{textAlign:'center'}}>Oops... Seems like your cart is empty.</p>
                                    <p style={{textAlign:'center'}}>Let's go explore and add a view items to cart.</p>
                                </>
                            ) : (
                                <Container style={{maxWidth:'800px'}}>
                                    {items.map(item => <Cart item={item} key={item._id} />)}
                                </Container>
                            )
                        )
                    )
                }
                <hr />
                <Container style={{maxWidth:'732px'}}>
                    <Typography color='textSecondary' style={{float:'right'}}>${total.toFixed(2)}</Typography>
                    <Typography color='textSecondary'>TOTAL:</Typography>
                    <Typography color='textSecondary' style={{float:'right'}}>${shipping.toFixed(2)}</Typography>
                    <Typography color='textSecondary'>SHIPPING:</Typography>
                    <Typography color='textPrimary' variant='h5' style={{float:'right'}}>${subtotal.toFixed(2)}</Typography>
                    <Typography color='textPrimary' variant='h5'>Subtotal:</Typography>
                    <Button onClick={orderHandler} variant='contained' color='primary' style={{float:'right', marginTop:'30px'}}>Check Out</Button>
                </Container>
            </Container>
        </div>
    );
}

export default Checkout;