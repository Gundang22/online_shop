import * as api from '../api/index.js';

export const getCart = () => async (dispatch) => {
    try{
        console.log("?2?");
        dispatch({type: 'SET_LOADING'});
        const { data } = await api.fetchCart();
        console.log(data);
        dispatch({
            type: 'GET_CART',
            payload: data
        });
    } catch(err){
        dispatch({
            type: 'SET_CARTMESSAGE',
            payload: err.response.data.error,
        });
    }
}

export const addCart = (item) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await api.addCart(item);
        dispatch({
            type: 'ADD_CART',
            payload: data.data
        });
    } catch(err){
        dispatch({
            type: 'SET_CARTMESSAGE',
            payload: err.response.data.error,
        });
    }
}

export const deleteCartItem = (item) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await api.deleteCartItem(item);
        dispatch({
            type: 'DELETE_ITEM_CART',
            payload: data.data
        });
    } catch(err){
        dispatch({
            type: 'SET_CARTMESSAGE',
            payload: err.response.data.error,
        });
    }
}