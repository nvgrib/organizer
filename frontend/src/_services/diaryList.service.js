import { headers } from '../_helpers';


export const diaryListService = {
	getDiaries,
	createDiary,
	updateDiary,
	deleteDiary,

	getEntries,
	createEntry,
	updateEntry,
	deleteEntry

}

// to get all personal diaries
function getDiaries(params) {
	const { userId } = params;
	const requestOptions = {
		method: 'GET',
		headers: Object.assign(
			{}, 
			headers.contentType(),
			headers.authorization()
		)
	};

	return fetch(`api/diaries/?user=${userId}`, requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		})
		.then(data => {
			return data.results
		})
};

function createDiary(diary) {
	const requestOptions = {
		method: 'POST',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization()
		),
		body: JSON.stringify(diary)
	};

	return fetch('api/diaries/', requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		});
};

function updateDiary(diary) {
	const requestOptions = {
		method: 'PUT',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization()
		),
		body: JSON.stringify(diary)
	};
	
	return fetch(`api/diaries/${diary.id}/`, requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		});
};

function deleteDiary(params) {
	const { diaryId } = params;
	const requestOptions = {
		method: 'DELETE',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization()
		)
	};

	return fetch(`api/diaries/${diaryId}/`, requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}
		});
};


function getEntries(params) {
	const { userId, diaryId } = params;
	const requestOptions = {
		method: 'GET',
		headers: Object.assign(
			{}, 
			headers.contentType(),
			headers.authorization()
		)
	};
	let url = 'api/entries/?';
	
	if (userId) {
		url += `user=${userId}&`
	} 
	
	if (diaryId) {
		url += `diary=${diaryId}&`
	}
	
	return fetch(url, requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		})
		.then(data => {
			return data.results
		})
};

function createEntry(entry) {
	const requestOptions = {
		method: 'POST',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization()
		),
		body: JSON.stringify(entry)
	};

	return fetch('api/entries/', requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		});
};

function updateEntry(entry) {
	const requestOptions = {
		method: 'PUT',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization()
		),
		body: JSON.stringify(entry)
	};
	
	return fetch(`api/entries/${entry.id}/`, requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}

			return response.json()
		});
};

function deleteEntry(params) {
	const { entryId } = params;
	const requestOptions = {
		method: 'DELETE',
		headers: Object.assign(
			{},
			headers.contentType(),
			headers.authorization()
		)
	};

	return fetch(`api/entries/${entryId}/`, requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText)
			}
		});
};