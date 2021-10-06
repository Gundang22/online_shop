import * as api from '../api/index.js';
import { commerce } from '../lib/commerce.js';

export const getCart = () => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await commerce.cart.retrieve();
        dispatch({
            type: 'GET_CART',
            payload: data,
        })
    } catch(err){
        console.log(err);
    }
}

export const addCart = (itemid, variant) => async(dispatch) => {
    try{
        console.log(variant)
        let data;
        if(variant)
            data = await commerce.cart.add(itemid, 1, variant);
        else
            data = await commerce.cart.add(itemid, 1);

        dispatch({
            type: 'ADD_CART',
            payload: data,
        });
    } catch(err){
        dispatch({
            type: 'CART_ERROR',
            payload: err
        });
    }
}

export const updateQty = (itemid, quantity) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await commerce.cart.update(itemid, {quantity});
        console.log(data);
        dispatch({
            type: 'UPDATE_CAR_QTY',
            payload: data,
        })
    } catch(err){
        console.log(err);
    }
}

export const deleteCartItem = (itemid) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await commerce.cart.remove(itemid)
        console.log(data);
        dispatch({
            type: 'DELETE_ITEM_CART',
            payload: data
        });
    } catch(err){
        dispatch({
            type: 'SET_CARTMESSAGE',
            payload: err.response.data.error,
        });
    }
}