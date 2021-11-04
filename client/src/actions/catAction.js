import { commerce } from '../lib/commerce.js';

export const getCategory = () => async(dispatch) => {
    try{
        dispatch({
            type: 'SET_LOADING'
        });
        const data = await commerce.categories.list();
        dispatch({
            type: 'GET_CAT',
            payload: data,
        })
    } catch(err) {
        console.log(err);
        dispatch({
            type: 'CAT_ERROR',
            payload: err,
        });
    }
}

export const getOneCate = (id) => async(dispatch) => {
    try{
        const data = await commerce.categories.retrieve(id);
        return data;
    } catch(err){
        console.log(err);
        dispatch({
            type: 'CAT_ERROR',
            payload: err,
        })
    }
};