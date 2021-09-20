import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getItems, getItemsPage} from './actions/itemAction';
import {getCart} from './actions/cartAction';
import { Route, Switch, Redirect } from 'react-router-dom';

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

import Home from './components/Layout/Home';
import NavBar from './components/Navbar/NavBar.js';
import Checkout from './components/Checkout/Cart.js';
import Auth from './components/Authentication/Auth';
import Detail from './components/Item/Item/Itemdescription';
import Orders from './components/Order/Orders';
import Payment from './components/Checkout/Payment/Checkout';
import ResetPassword from './components/Authentication/Forgot/ResetPassword';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItemsPage());
    }, [dispatch]);


    return (
        <div>
            <Switch>
                <Route path='/payment/:orderId' component={Payment} />
                <div>
                    <NavBar />
                    <Route path='/' exact component={() => <Redirect to='/home' />} />
                    <Route path='/home' component={Home} />
                    <Route path='/home/search' component={Home} />
                    <Route path='/items/:id' component={Detail} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/authentication' component={Auth} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/resetpassword/:token' component={ResetPassword} />
                </div>
            </Switch>
        </div>
    );
}

export default App;