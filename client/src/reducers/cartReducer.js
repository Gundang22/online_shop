const initialState = {
    items: null,
    loading: false,
    missingItems: null,
    message: null,
};


export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
                message: null,
            };
        case 'GET_CART':
            return {
                ...state,
                items: action.payload.items,
                loading: false,
                message: null,
                message: action.payload.message || null,
            };
        case 'ADD_CART':
            return {
                ...state,
                items: action.payload.items,
                loading: false,
                message: null,
                message: action.payload.message,
            };
        case 'DELETE_ITEM_CART':
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload.id),
                loading: false,
                message: null,
                message: action.payload.message,
            }
        case 'MISSING_ITEMS':
            return {
                ...state,
                missingItems: action.payload,
                loading: false,
                message: 'Some items have been deleted from cart due to missing...',
            };
        case 'SET_CARTMESSAGE':
            return {
                ...state,
                loading: false,
                message: null,
                message: action.payload,
            }
        default:
            return {...state};
    }
}