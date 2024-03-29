import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Switch, Router, Route, Link } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App.js';
import Home from './Home.js';
import newClaim from './newClaim.js';

render(
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={Home}/>
        <Route exact={true} path='/portal' component={App}/>
        <Route exact={true} path='/newClaim' component={newClaim}/>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
