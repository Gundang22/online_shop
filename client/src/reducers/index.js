import { combineReducers } from "redux";

import items from './itemReducer';
import cartItem from './cartReducer';
import auth from "./authReducer";
import orders from './orderReducer';

export default combineReducers({
    items,
    cartItem,
    auth,
    orders,
});