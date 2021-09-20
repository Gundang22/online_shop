import * as api from '../api/index.js';

export const signIn = (formData, history) => async(dispatch) => {
    try{
      const { data } = await api.signIn(formData);
      dispatch({
          type: 'AUTH',
          payload: data,
      })
      history.push('/home');
    } catch(err){
        dispatch({
            type: 'SET_AUTHMESSAGE',
            payload: err.response.data.error,
        });
    }
};

export const signUp = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.signUp(formData);
        dispatch({
            type: 'AUTH',
            data
        })
        history.push('/home');
    } catch(err){
        dispatch({
            type: 'SET_AUTHMESSAGE',
            payload: err.response.data.error,
        });
    }
};

export const forgotPassword = (email) => async(dispatch) => {
    try{
        const {data} = await api.forgotPassword(email);
        dispatch({
            type: 'SET_AUTHMESSAGE',
            payload: data.data,
        });
    } catch(err){
        dispatch({
            type: 'SET_AUTHMESSAGE',
            payload: err.response.data.error,
        });
    }
};

export const getResetPassword = (token) => async(dispatch) => {
    try{
        const {data} = await api.getResetPassword(token);
        dispatch({
            type:'GET_RESETPASS',
            paylaod: data,
        });
    } catch(err){
        dispatch({
            type: 'SET_DENIED',
            payload: err.response.data.error,
        });
    }
}

export const resetPassword = (token, password) => async(dispatch) => {
    try{
        const {data} = await api.resetPassword(token, password);
        dispatch({
            type:'POST_RESETPASS',
            payload: data,
        });
    } catch(err){
        dispatch({
            type: 'SET_AUTHERROR',
            payload: err.response.data.error,
        });
    }
}