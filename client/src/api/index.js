import axios from 'axios';

const API = axios.create({baseURL: 'https://wecpz2ep10.herokuapp.com'});
// const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchItemsPage = (page) => API.get(`/items/page?page=${page}`);
export const fetchItems = () => API.get('/items');
export const fetchOneItem = (id) => API.get(`/items/${id}`);
export const fetchSearch = (searchQuery) => API.get(`/items/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createItem = (newItem) => API.post('/items', newItem);
export const updateItem = (id, updatedItem) => API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const fetchCart = () => API.get(`/cart`);
export const addCart = (item) => API.post(`/cart`, item);
export const deleteCartItem = (item) => API.post(`/cart/delete`, item);

export const signIn = (formData) => API.post(`/auth/signin`, formData);
export const signUp = (formData) => API.post(`/auth/signup`, formData);
export const forgotPassword = (email) => API.post(`/auth/forgotpassword`, email);
export const getResetPassword = (token) => API.get(`/auth/resetpassword/${token}`);
export const resetPassword = (token, password) => API.post(`auth/resetpassword/${token}`, password);

export const createPaymentIntent = () => API.post(`/order/paymentintent`);
export const postOrder = (items) => API.post(`/order`, items);
export const getOneOrder = (orderId) => API.get(`/order/${orderId}`);
export const confirmOrder = (id, orderData) => API.post(`/order/${id}`, orderData);
export const getOrders = () => API.get(`/order`);
export const updateOrder = (id, order) => API.patch(`/order/${id}`, order);