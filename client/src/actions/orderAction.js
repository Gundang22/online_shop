import * as api from '../api/index.js';
import { commerce } from '../lib/commerce.js';

export const captureOrder = (checkoutTokenId, orderData, history) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const newOrder = await commerce.checkout.capture(checkoutTokenId, orderData);
        dispatch({
            type: 'CAPTURE_ORDER',
            payload: newOrder,
        });
    } catch(err){
        console.log(err);
        dispatch({
            type: 'ORDER_ERROR',
            payload: err
        });
    }
}

export const postOrder = (cart, history) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
        dispatch({
            type: 'POST_ORDER',
            payload: token,
        });
        history.push(`/payment/${token.id}`);
    } catch(err){
        console.log(err,"!2");
        dispatch({
            type:'ORDER_ERROR',
            payload: err
        })
    }
}

export const getOrderToken = (checkoutTokenId) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const token = await commerce.checkout.getToken(checkoutTokenId);
        dispatch({
            type: 'GET_ORDER_TOKEN',
            payload: token,
        });
    } catch(err){
        console.log(err);
        dispatch({
            type: 'ORDER_ERROR',
            payload: err,
        });
    }
}

export const confirmOrder = (id, orderData) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        await api.confirmOrder(id, orderData);
        dispatch({
            type: 'CONFIRM_ORDER',
        });
    } catch(err){
        dispatch({
            type: 'ORDER_ERROR',
            payload: err.response.data.error,
        })
    }
}

export const getOrders = () => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await api.getOrders();
        dispatch({
            type: 'GET_ORDERS',
            payload: data.data,
        });
    } catch(err){
        console.log(err);
        dispatch({
            type: 'ORDER_ERROR',
            payload: err.response.data.error,
        });
    }
}

export const updateOrder = (id, order) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data} = await api.updateOrder(id, order);
        dispatch({
            type: 'UPDATE_ORDER',
            payload: data,
        });
    } catch(err){
        console.log("??");
        dispatch({
            type: 'ORDER_ERROR',
            payload: err.response.data.error,
        });
    }
}