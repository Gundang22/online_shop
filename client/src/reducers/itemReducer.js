const initialState = {
    item: null,
    items: null,
    relatedItems: null,
    itemsPage: null,
    itemsSort: null,
    category: null,
    children: null,
    loading: false,
    numberOfPages: null,
    currentPage: null,
    message: null,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'GET_ALL':
            return {
                ...state,
                items: action.payload,
                loading: false,
                message: null,
            };
        case 'GET_ITEMS_PAGE':
            return {
                ...state,
                itemsPage: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                loading: false,
                message: null,
            };
        case 'GET_ITEM':
            return {
                ...state, 
                item: action.payload,
                loading: false,
                message: null,
            };
        case 'SEARCH_ITEM':
            return {
                ...state, 
                items: action.payload,
                loading: false,
                message: null,
            };
        case 'GET_CAT_ITEMS':
            return {
                ...state,
                items: action.payload.data,
                category: action.payload.category,
                children: action.payload.children,
                loading: false,
                message: null,
            }
        case 'GET_RELATED_ITEMS':
            return {
                ...state,
                relatedItems: action.payload.data,
                category: action.payload.category,
            }
        case 'SORT_ITEMS': 
            return{
                ...state,
                itemsSort: action.payload,
                loading: false,
                message: null,
            }
        case 'ITEM_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'ITEM_CLEAR':
            return {state: initialState}
        default: 
            return state;
    }
}

export default reducer;