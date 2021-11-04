const initialState = {
    items: null,
    loading: false,
    missingItems: null,
    message: null,
};


const reducer = (state = initialState, action) => {
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
                loading: false,
                cart: action.payload,
                message: null,
            };
        case 'ADD_CART':
            return {
                ...state,
                loading: false,
                cart: action.payload.cart,
                message: `Item '${action.payload.product_name}' Added To Cart!`
            };
        case 'UPDATE_CAR_QTY':
            return {
                ...state,
                loading: null,
                cart: action.payload.cart,
                message: null,
            }
        case 'DELETE_ITEM_CART':
            return {
                ...state,
                loading: false,
                cart: action.payload.cart,
                message: 'Cart Item Removed!',
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
                message: action.payload,
            }
        default:
            return {...state};
    }
}
export default reducer;