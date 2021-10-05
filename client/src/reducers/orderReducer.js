const initialState = {
    checkoutToken: null,
    order: null,
    loading: false,
    message: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
                message: null,
            };
        case 'CAPTURE_ORDER':
            return {
                ...state,
                order: action.payload,
                loading: false,
                message: null,
            };
        case 'ORDER_ERROR':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        case 'POST_ORDER':
            return {
                ...state,
                checkoutToken: action.payload,
                loading: false,
                message: null,
            }
        case 'GET_ORDER_TOKEN':
            return {
                ...state,
                checkoutToken: action.payload,
                loading: false,
                message: null,
            }
        default:
            return state;
    }
}
export default reducer;