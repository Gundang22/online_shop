const initialState = {
    items: null,
    loading: false,
    numberOfPages: null,
    currentPage: null,
    message: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
                message: null,
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
                items: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                loading: false,
                message: null,
            };
        case 'GET_ITEM':
            return {...state, 
                item: action.payload.data,
                loading: false,
                message: null,
            };
        case 'SEARCH_ITEM':
            return {...state, 
                items: action.payload,
                loading: false,
                message: null,
            };
        case 'POST_ITEM':
            return {
                ...state, 
                items: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                loading: false,
                message: null,
                message: action.payload.message,
            };
        case 'UPDATE':
            return {
                ...state,
                items: state.items.map((item) => item._id === action.payload.data._id ? action.payload.data : item),
                loading: false,
                message: null,
                message: action.payload.message,
            }
        case 'DELETE':
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload.data),
                loading: false,
                message: null,
                message: action.payload.message,
            }
        case 'SET_MESSAGE':
            return {
                ...state,
                loading: false,
                message: null,
                message: action.payload.message
            }
        case 'CLEAR':
            return {state: initialState}
        default: 
            return state;
    }
}