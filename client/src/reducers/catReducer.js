const initialState = {
    categories: null,
    category: null,
    loading: false,
    message: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
                message: false,
            };
        case 'GET_CAT':
            return {
                ...state,
                loading: false,
                message: null,
                categories: action.payload,
            };
        case 'GET_ONE_CAT':
            return {
                ...state,
                loading: false,
                message: null,
                category: action.payload,
            }
        case 'CAT_ERROR':
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        default: 
            return {
                ...state
            }
    }
}

export default reducer;