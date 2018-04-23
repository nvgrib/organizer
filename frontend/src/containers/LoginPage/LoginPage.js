import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { LoginPage } from '../../LoginPage';

function mapDispatchToProps(dispatch, ownProps) {
	return {
		login: (username, password) => {
			dispatch(userActions.login(username, password));
		}
	};
};

const ConnectedLoginPage = connect(undefined, mapDispatchToProps)(LoginPage);
export { ConnectedLoginPage as LoginPage }

