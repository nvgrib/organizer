import { headers } from '../_helpers';


export const userService = {
	getToken,
	getUser,
	logout
};


function getToken(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: headers.contentType(),
		body: JSON.stringify({username, password})
	};

	return fetch('api-token-auth/', requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}
			return response.json()
		})
		.then(data => {
			const token = data.token;


			localStorage.setItem('token', JSON.stringify(token));
			return token
		})
}


function getUser(token) {
	const requestOptions = {
		method: 'GET',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization(token)
		)
	};

	return fetch('api/account/', requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		})
		.then(user => {
			localStorage.setItem('user', JSON.stringify(user));

			return user
		})
};

function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
}