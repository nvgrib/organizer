import { diaryListConstants } from '../_constants';
import { diaryListService } from '../_services';


export const diaryListActions = {
	getDiaries,
	createDiary,
	updateDiary,

	getEntries,
	createEntry,
	updateEntry,

	setItemsFilter,
	setFormType,
	setChosenDiary,
	setChosenEntry
};


function getDiaries(params) {	
	return dispatch => {
		dispatch(request());

		diaryListService.getDiaries(params)
			.then(
				diaries => dispatch(success(diaries)),
				error => dispatch(failure(error))
			);
	};
	
	function request() {
		return {
			type: diaryListConstants.GET_DIARIES_BY_PARAMS_REQUEST,
			params
		};
	};

	function success(diaries) {
		return {
			type: diaryListConstants.GET_DIARIES_BY_PARAMS_SUCCESS,
			params,
			diaries
		};
	};

	function failure(error) {
		return {
			type: diaryListConstants.GET_DIARIES_BY_PARAMS_FAILURE,
			params,
			error
		};
	};
};

function createDiary(diary) {
	return dispatch => {
		dispatch(request());

		diaryListService.createDiary(diary)
			.then(
				diary => dispatch(success(diary)),
				error => dispatch(failure(error))
			);
	};

	function request() {
		return {
			type: diaryListConstants.CREATE_DIARY_REQUEST,
			diary
		};
	};

	function success(diaries) {
		return {
			type: diaryListConstants.CREATE_DIARY_SUCCESS,
			diary
		};
	};

	function failure(error) {
		return {
			type: diaryListConstants.CREATE_DIARY_FAILURE,
			error,
			diary
		};
	};
};

function updateDiary(diary) {
	return dispatch => {
		dispatch(request());

		diaryListService.updateDiary(diary)
			.then(
				diary => dispatch(success(diary)),
				error => dispatch(failure(error))
			);
	};

	function request() {
		return {
			type: diaryListConstants.UPDATE_DIARY_REQUEST,
			diary
		};
	};

	function success(diaries) {
		return {
			type: diaryListConstants.UPDATE_DIARY_SUCCESS,
			diary
		};
	};

	function failure(error) {
		return {
			type: diaryListConstants.UPDATE_DIARY_FAILURE,
			diary,
			error
		};
	};
};

function getEntries(params) {	
	return dispatch => {
		dispatch(request());

		diaryListService.getEntries(params)
			.then(
				entries => dispatch(success(entries)),
				error => dispatch(failure(error))
			);
	};

	function request() {
		return {
			type: diaryListConstants.GET_ENTRIES_BY_PARAMS_REQUEST,
			params
		};
	};

	function success(entries) {
		return {
			type: diaryListConstants.GET_ENTRIES_BY_PARAMS_SUCCESS,
			params,
			entries
		};
	};

	function failure(error) {
		return {
			type: diaryListConstants.GET_ENTRIES_BY_PARAMS_FAILURE,
			params,
			error
		};
	};
};

function createEntry(entry) {
	return dispatch => {
		dispatch(request());

		diaryListService.createEntry(entry)
			.then(
				entry => dispatch(success(entry)),
				error => dispatch(failure(error))
			);
	};

	function request() {
		return {
			type: diaryListConstants.CREATE_ENTRY_REQUEST,
			entry
		};
	};

	function success(entries) {
		return {
			type: diaryListConstants.CREATE_ENTRY_SUCCESS,
			entry
		};
	};

	function failure(error) {
		return {
			type: diaryListConstants.CREATE_ENTRY_FAILURE,
			entry,
			error
		};
	};
};

function updateEntry(entry) {
	return dispatch => {
		dispatch(request());

		diaryListService.updateEntry(entry)
			.then(
				entry => dispatch(success(entry)),
				error => dispatch(failure(error))
			);
	};

	function request() {
		return {
			type: diaryListConstants.UPDATE_ENTRY_REQUEST,
			entry
		};
	};

	function success(entries) {
		return {
			type: diaryListConstants.UPDATE_ENTRY_SUCCESS,
			entry
		};
	};

	function failure(error) {
		return {
			type: diaryListConstants.UPDATE_ENTRY_FAILURE,
			entry,
			error
		};
	};
};

function setItemsFilter(filter) {
	return {
		type: diaryListConstants.SET_ITEMS_FILTER,
		filter
	};
};

function setFormType(formType) {
	return {
		type: diaryListConstants.SET_FORM_TYPE,
		formType
	};
};

function setChosenDiary(diaryId) {
	return {
		type: diaryListConstants.SET_CHOSEN_DIARY,
		diaryId
	};
};

function setChosenEntry(entryId) {
	return {
		type: diaryListConstants.SET_CHOSEN_ENTRY,
		entryId
	};
};
