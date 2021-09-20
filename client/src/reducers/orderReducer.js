const initialState = {
    orders: null,
    loading: false,
    clientMessage: null,
    message: null,
};

export default (state = initialState, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
                message: null,
                clientMessage: null,
            };
        case 'POST_ORDER':
            return {
                ...state,
                loading: false,
            };
        case 'GET_ORDERS':
            return {
                ...state,
                orders: action.payload.data,
                loading: false,
                message: null,
                clientMessage: null,
            };
        case 'GET_ONE_ORDER':
            console.log(action.payload.data);
            return {
                ...state,
                orders: action.payload.data,
                loading: false,
                message: null,
                clientMessage: null,
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map((order) => order._id === action.payload.data._id ? action.payload.data: order),
                loading: false,
                message: action.payload.message,
            };
        case 'ORDER_ERROR':
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case 'CLIENT_ORDER_ERROR':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                clientMessage: action.payload,
            }
        default:
            return state;
    }
}