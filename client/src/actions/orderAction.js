import { commerce } from '../lib/commerce.js';

export const captureOrder = (checkoutTokenId, orderData) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const newOrder = await commerce.checkout.capture(checkoutTokenId, orderData);
        dispatch({
            type: 'CAPTURE_ORDER',
            payload: newOrder,
        });
    } catch(err){
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
        console.log(err);
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