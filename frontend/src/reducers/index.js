import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { diaryList } from './diaryList.reducer';


const rootReducer = combineReducers({
	authentication,
	diaryList
});


export default rootReducer;
