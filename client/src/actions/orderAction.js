import * as api from '../api/index.js';

export const postOrder = (items, history) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await api.postOrder(items);
        dispatch({
            type: 'POST_ORDER',
        });
        history.push(`/payment/${data.data.orderId}`);
    } catch(err){
        dispatch({
            type: 'CLIENT_ORDER_ERROR',
            payload: err.response.data.error,
        });
    }
}

export const getOneOrder = (orderId) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await api.getOneOrder(orderId);
        dispatch({
            type: 'GET_ONE_ORDER',
            payload: data.data,
        });
    } catch(err){
        dispatch({
            type: 'CLIENT_ORDER_ERROR',
            payload: err.response.data.error,
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
        console.log(data);
        dispatch({
            type: 'GET_ORDERS',
            payload: data.data,
        });
    } catch(err){
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