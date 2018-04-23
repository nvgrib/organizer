import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Route, Switch } from 'react-router';
import thunk from 'redux-thunk'

import { logger, history } from './_helpers';
import { userService, diariesService } from './_services';
import { userActions, diariesActions } from './actions';
import rootReducer from './reducers';

import { PrimaryLayout } from './containers/PrimaryLayout';
import { LoginPage } from './containers/LoginPage'


const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		logger
	)
);

render(
	(
		<Provider store={store}>
			<Router history={history}>
				<Switch>
					<Route path='/login'component={LoginPage} />
					<Route component={PrimaryLayout} />
				</Switch>
			</Router>
		</Provider>
	),
	document.getElementById('root')
);