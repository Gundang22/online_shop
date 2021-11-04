import { commerce } from '../lib/commerce.js';
const ITEMS_PER_PAGE = 12;

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
            type: 'ITEM_ERROR',
            payload: err,
        });
    }
}

export const getItems = () => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data} = await commerce.products.list();
        dispatch({
            type: 'GET_ALL',
            payload: data
        });
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err,
        });
    }
}

export const getSearchItems = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const {data} = await commerce.products.list();
        const items = data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        dispatch({
            type: 'SEARCH_ITEM',
            payload: items,
        })
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err,
        });
    }
};

export const getItemsPage = (items, page) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const totalItems = items.length;
        const startIndex = (page - 1) * ITEMS_PER_PAGE; 
        const itemsPage = items.slice(startIndex, startIndex+ITEMS_PER_PAGE);
        const result = {
            data: itemsPage,
            currentPage: Number(page),
            numberOfPages: Math.ceil(totalItems/ITEMS_PER_PAGE),
        }
        dispatch({
            type: 'GET_ITEMS_PAGE',
            payload: result
        })
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err.response.data.error,
        });
    }
};

export const getCategoryItem = (category) => async (dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const data = await commerce.products.list();
        const cate = await commerce.categories.retrieve(category);
        const items = [];
        data.data.forEach(item => {
            let marked = false;
            item.categories.forEach(itemCate => {
                if(itemCate.id === category){
                    marked = true;
                    return;
                }
            });
            if(marked) items.push(item);
        });
        const result = {
            data: items,
            category: cate,
            children: cate.children,
        };
        dispatch({
            type: 'GET_CAT_ITEMS',
            payload: result,
        });
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err,
        });
    }
}

export const sortItems = (items, sort) => async(dispatch) => {
    console.log(sort);
    try{
        dispatch({type: 'SET_LOADING'});
        let result = [];
        items.forEach((item) => {
            result.push(item);
        });
        if(!sort || sort === 'default'){
            dispatch({
                type: 'SORT_ITEMS',
                payload: items,
            });
        }
        else if(sort === 'highlow'){
            result.sort((a, b) => b.price.raw - a.price.raw);
            dispatch({
                type: 'SORT_ITEMS',
                payload: result,
            });
        }
        else if (sort === 'lowhigh'){
            result.sort((a, b) => a.price.raw - b.price.raw);
            dispatch({
                type: 'SORT_ITEMS',
                payload: result,
            });
        }
        else{
            dispatch({
                type: 'SORT_ITEMS',
                payload: items,
            });
        }
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err,
        })
    }
}

export const getRelatedProducts = (id) => async(dispatch) => {
    try{
        dispatch({type: 'SET_LOADING'});
        const item = await commerce.products.retrieve(id);
        const category = await commerce.categories.retrieve(item.categories[0].id);
        const data = await commerce.products.list();
        const items = [];
        data.data.forEach(item => {
            let marked = false;
            item.categories.forEach(itemCate => {
                if(itemCate.id === category.id){
                    marked = true;
                    return;
                }
            });
            if(marked) items.push(item);
        });
        const temp = items.filter((item) => item.id !== id);
        const result = {
            data: temp,
            category: category,
        };
        dispatch({
            type: 'GET_RELATED_ITEMS',
            payload: result,
        });
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err,
        })
    }
}

export const itemsSetClear = () => async(dispatch) => {
    try{
        dispatch({type: 'ITEM_CLEAR'});
    } catch(err){
        dispatch({
            type: 'ITEM_ERROR',
            payload: err,
        })
    }
}