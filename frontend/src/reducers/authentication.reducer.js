import { userConstants } from '../_constants';


const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user } : {};

export function authentication(state=initialState, action) {
	switch (action.type) {
		case userConstants.GET_TOKEN_REQUEST:
			return {
				loading: true,
			};

		case userConstants.GET_TOKEN_SUCCESS:
			return {
				loading: false,
			};

		case userConstants.GET_TOKEN_FAILURE:
			return {
				loading: false,
				error: action.error
			};

		case userConstants.GET_USER_REQUEST:
			return {
				loading: true,
			};

		case userConstants.GET_USER_SUCCESS:
			return {
				loading: false,
				user: action.user
			};

		case userConstants.GET_USER_FAILURE:
			return {
				loading: false,
				error: action.error
			};

		case userConstants.LOGIN_REQUEST:
			return {
				loading: true,
			};

		case userConstants.LOGIN_SUCCESS:
			return {
				loading: false,
				user: action.user
			};

		case userConstants.LOGIN_SUCCESS:
			return {
				loading: false,
				error: action.error
			};

		case userConstants.LOGOUT:
			return {};

		default:
			return state
	};
};