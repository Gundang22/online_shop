import * as api from '../api/index.js';
import { commerce } from '../lib/commerce.js';

export const getItems = () => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const { data } = await api.fetchItems();
        dispatch({
            type: 'GET_ALL',
            payload: data
        });
    } catch(err){
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
}

export const getItem = (id) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const item = await commerce.products.retrieve(id);
        dispatch({
            type: 'GET_ITEM',
            payload: item
        });
    } catch(err){
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
}

export const searchItem = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data: data} = await api.fetchSearch(searchQuery);
        dispatch({
            type: 'SEARCH_ITEM',
            payload: data
        })
    } catch(err){
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
};

export const getItemsPage = (page) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data} = await commerce.products.list();
        dispatch({
            type: 'GET_ITEMS_PAGE',
            payload: data
        })
    } catch(err){
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
};

export const postItem = (item) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data} = await api.createItem(item);
        dispatch({
            type: 'POST_ITEM',
            payload: data
        });
    } catch(err){
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
}

export const updateItem = (id, updatedItem) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const { data } = await api.updateItem(id, updatedItem);
        dispatch({
            type: 'UPDATE',
            payload: data
        });
    } catch(err) {
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
};

export const deleteItem = (id) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data} = await api.deleteItem(id);
        dispatch({
            type: 'DELETE',
            payload: data
        })
    } catch(err){
        dispatch({
            type: 'SET_MESSAGE',
            payload: err.response.data.error,
        });
    }
};