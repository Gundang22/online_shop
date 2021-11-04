import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';


import Home from './components/Layout/Home';
import NavBar from './components/Navbar/NavBar.js';
import Checkout from './components/Checkout/Cart.js';
import Detail from './components/Item/Item/Itemdescription';
import Payment from './components/Checkout/Payment/Checkout';
import SearchProducts from './components/Search/SearchProduct';
import { Divider } from '@material-ui/core';
import Footer from './components/Layout/Footer';
import Catalog from './components/Item/Category/Catalog';
import Documentation from './components/Layout/Documentation';
import ErrorPage from './components/Layout/ErrorPage';

const App = () => {
    const id = useLocation().key;
    return (
        <div style={{backgroundColor: '#E4CAAA', color:'white'}}>
            <Switch>
                <Route path='/payment/:token' component={Payment} key={id} />
                <div>
                    <NavBar />
                    <Route path='/' exact component={() => <Redirect to='/home' />} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/search/:query' component={SearchProducts} key={id} />
                    <Route path='/items/:id' exact component={Detail} />
                    <Route path='/checkout' exact component={Checkout} />
                    <Route path='/catalog' component={Catalog} />
                    <Route path='/documentation' component={Documentation} />
                    <Divider style={{width:'50px', backgroundColor:'black', opacity:'1',margin:'auto'}} />
                    <Footer />
                </div>
            </Switch>
        </div>
    );
}

export default App;