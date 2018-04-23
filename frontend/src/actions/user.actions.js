import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';

export const userActions = {
	login,
	logout
};


function login(username, password) {
	return dispatch => {
		dispatch(request(username, password));
		dispatch(tokenRequest(username, password));

		userService.getToken(username, password)
			.then(
				token => {
					dispatch(tokenSuccess(token));
					dispatch(userRequest(token));

					userService.getUser(token)
						.then(
							user => {
								dispatch(userSuccess(user));
								dispatch(success(user));
								history.push('/');
							},
							error => {
								dispatch(userFailure(error));
								dispatch(failure(error));
							}
						)					
				},
				error => {
					dispatch(tokenFailure(error));
					dispatch(failure(error));
				}
			);
	};

	function tokenRequest(username, password) {
		return {
			type: userConstants.GET_TOKEN_REQUEST,
			username,
			password
		};
	};

	function tokenSuccess(token) {
		return {
			type: userConstants.GET_TOKEN_SUCCESS,
			token
		};
	};

	function tokenFailure(error) {
		return {
			type: userConstants.GET_TOKEN_FAILURE,
			error
		};
	};

	function userRequest(token) {
		return {
			type: userConstants.GET_USER_REQUEST,
			token
		};
	};

	function userSuccess(user) {
		return {
			type: userConstants.GET_USER_SUCCESS,
			user 
		};
	};

	function userFailure(error) {
		return {
			type: userConstants.GET_USER_FAILURE,
			error 
		};
	};

	function request(username, password) {
		return {
			type: userConstants.LOGIN_REQUEST,
			username,
			password
		};
	};

	function success(user) {
		return {
			type: userConstants.LOGIN_SUCCESS,
			user
		};
	};

	function failure(error) {
		return {
			type: userConstants.LOGIN_FAILURE,
			error
		};
	};
};

function logout() {
	userService.logout()
	
	return {
		type: userConstants.LOGOUT
	};
};