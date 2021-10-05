import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Container } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import Item from './Item/Item';
import {AddItem} from '../AddItem/AddItem.js';
import { CircularProgress, Button, Grid } from '@material-ui/core';
import { Toast } from 'react-bootstrap';
import { getItemsPage } from '../../actions/itemAction';
import { addCart } from '../../actions/cartAction';

export const Items = ({cart, setCart}) => {
    console.log(cart);
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    getItemsPage();

    const addToCart = async(itemid, quantity) => {
        dispatch(addCart(itemid, quantity));
    }

    const { items } = useSelector((state) => state.items);
    const {message} = useSelector((state) => state.cartItem);

    useEffect(() => {
        setShowMessage(true);
    },[message]);

    return (
        <div>
            <Container className='py-4'>
                {
                    message && 
                    <Toast className="text-center bg-success" style={{position:"fixed", width:"180px", top:'30px', right:'30px', color:'#EDEDED', zIndex:'10'}} onClose={() => setShowMessage(false)} show={showMessage} delay = {3000} autohide>
                        <Toast.Body>
                            <strong>{message}</strong>
                        </Toast.Body>
                    </Toast>
                }
                <Row style={{width:'auto'}}>
                    {
                        !items ?
                        (
                            <CircularProgress />
                        ) : (
                            items.map((item) => (
                                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                    <Item item={item} addToCart={addToCart} />
                                </Grid>
                            ))
                        )
                    }
                </Row>
            </Container>
        </div>
    );
}

export default Items;