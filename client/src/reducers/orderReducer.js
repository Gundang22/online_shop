const initialState = {
    checkoutToken: null,
    order: null,
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'CAPTURE_ORDER':
            return {
                ...state,
                order: action.payload,
                loading: false,
                error: null,
            };
        case 'ORDER_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'POST_ORDER':
            return {
                ...state,
                checkoutToken: action.payload,
                loading: false,
            }
        case 'GET_ORDER_TOKEN':
            return {
                ...state,
                checkoutToken: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}
export default reducer;