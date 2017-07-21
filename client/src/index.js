import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import App from './components/App';
import StoriesNew from './components/stories_new'
import Draft from './components/draftjs'
import StoriesRead from './components/stories_read'
import Header from './components/header'
import Mega from './components/megadraft'

const history = createHistory()
const browserHistory = routerMiddleware(history)

const createStoreWithMiddleware = applyMiddleware(reduxThunk, browserHistory, promise)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
	<Provider store={store}>
  	<ConnectedRouter history={history}>
  		<div>
  			<Switch>
  				<Route path='/new-story' component={RequireAuth(StoriesNew)} />
          <Route path='/story/:id' component={StoriesRead} />
          <Route path='/draft' component={Draft} />
          <Route path='/mega' component={Mega} />
          <Route path='/signin' component={Signin} /> 
          <Route path='/signup' component={Signup} /> 
          <Route path='/signout' component={Signout} />
	  			<Route path='/' component={App} />	
  			</Switch>
  		</div>
  	</ConnectedRouter>
  </Provider>
	, document.getElementById('root'));

