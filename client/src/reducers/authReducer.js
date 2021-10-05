const initialState = {
    authData: null,
    message: null,
    getAuth: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            return {
                ...state, 
                authData: action?.data,
                message: null,
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state, 
                authData: null,
                message: null,
            };
        case 'SET_AUTHMESSAGE':
            return {
                ...state,
                message: action.payload,
            };
        case "AUTH_CLEAR":
            return {
                ...state,
                authData: null,
                message: null,
            }
        case "GET_RESETPASS":
            return {
                ...state,
                message: null,
                getAuth: true,
            }
        case "POST_RESETPASS":
            return {
                ...state,
                message: action.payload.message,
            }
        case "SET_DENIED":
            return {
                ...state,
                getAuth: false,
                message: action.payload
            }
        case "SET_AUTHERROR":
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
};

export default authReducer;