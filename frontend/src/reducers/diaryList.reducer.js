import { diaryListConstants } from '../_constants';

const initialState = {
	loading: false, 
	params: {},
	diaries: [],
	entries: [],
	itemsFilter: 'SHOW_DIARIES',
	formType: 'DIARY_CREATE',
	chosenDiary: undefined,
	chosenEntry: undefined
};

export function diaryList(state=initialState, action) {
	switch (action.type) {
		case diaryListConstants.GET_DIARIES_BY_PARAMS_REQUEST:
		case diaryListConstants.GET_DIARIES_BY_PARAMS_SUCCESS:
		case diaryListConstants.GET_DIARIES_BY_PARAMS_FAILURE:
			return Object.assign(
				{},
				state,
				diaries(undefined, action)
			);

		case diaryListConstants.GET_ENTRIES_BY_PARAMS_REQUEST:
		case diaryListConstants.GET_ENTRIES_BY_PARAMS_SUCCESS:
		case diaryListConstants.GET_ENTRIES_BY_PARAMS_FAILURE:
			return Object.assign(
				{},
				state,
				entries(undefined, action)
			);

		case diaryListConstants.SET_ITEMS_FILTER:
			return Object.assign(
				{},
				state,
				{ itemsFilter: action.filter }
			);

		case diaryListConstants.SET_FORM_TYPE:
			return Object.assign(
				{},
				state,
				{ formType: action.formType }
			);

		case diaryListConstants.SET_CHOSEN_DIARY:
			return Object.assign(
				{},
				state,
				{ chosenDiary: action.diaryId }
			);

		case diaryListConstants.SET_CHOSEN_ENTRY:
			return Object.assign(
				{},
				state,
				{ chosenEntry: action.entryId }
			);

		default:
			return state;
	};
};

function diaries (state, action) {
	switch (action.type) {
		case diaryListConstants.GET_DIARIES_BY_PARAMS_REQUEST:
			return {
				loading: true,
				params: action.params
			};
			
		case diaryListConstants.GET_DIARIES_BY_PARAMS_SUCCESS:
			return {
				loading: false,
				params: action.params,
				diaries: action.diaries
			};

		case diaryListConstants.GET_DIARIES_BY_PARAMS_FAILURE:
			return {
				loading: false,
				params: action.params,
				error: action.error
			};

		default:
			return state;
	};
};

function entries(state, action) {
	switch (action.type) {
		case diaryListConstants.GET_ENTRIES_BY_PARAMS_REQUEST:
			return {
				loading: true,
				params: action.params
			};

		case diaryListConstants.GET_ENTRIES_BY_PARAMS_SUCCESS:
			return {
				loading: false,
				params: action.params,
				entries: action.entries
			};

		case diaryListConstants.GET_ENTRIES_BY_PARAMS_FAILURE:
			return {
				loading: false,
				params: action.params,
				error: action.error
			};

		default:
			return state;
	};
};