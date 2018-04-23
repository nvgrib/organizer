import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PrimaryLayout } from '../components/PrimaryLayout';
import { diaryListActions, userActions } from '../actions';


const mapStateToProps = (state) => {
	return {
		user: state.authentication.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onDiariesLinkClick: (params) => {
			dispatch(diaryListActions.getDiaries(params));
		},
		onLogoutLinkClick: () => {
			dispatch(userActions.logout());
		}
	};
};

const ConnectedPrimaryLayout = connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);

export { ConnectedPrimaryLayout as PrimaryLayout }