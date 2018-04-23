export const headers = {
	contentType,
	authorization
}


function contentType() {
	return {
		'Content-Type': 'application/json'
	};
};

function authorization() {
	let token = JSON.parse(localStorage.getItem('token'));

	return {
		'Authorization': `Token ${token}`
	};
};