import React from 'react';
import { connect } from 'react-redux';

import { diaryListActions } from '../../actions';
import { itemsFilterConstants, formTypeConstants} from '../../_constants';
import { ReferenceMap } from '../../components/DiariesLayout/ReferenceMap';


function mapStateToProps(state, ownProps) {
	const userId = state.authentication.user.id;
	
	return {
		userId
	};
};

function mapDispatchToProps(dispatch, ownProps) {
	const { getDiaries, setItemsFilter, setFormType } = diaryListActions;
	const filter = itemsFilterConstants.SHOW_DIARIES;
	const formType = formTypeConstants.DIARY_CREATE;

	return {
		showDiaries: (params) => { 
			dispatch(getDiaries(params));
			dispatch(setItemsFilter(filter));
			dispatch(setFormType(formType));
		}
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { showDiaries } = dispatchProps;
	const params = stateProps;
	
	return {
		showDiaries: () => showDiaries(params)
	};
};

const ConnectedReferenceMap = connect(
	mapStateToProps, 
	mapDispatchToProps, 
	mergeProps)
(ReferenceMap);
export { ConnectedReferenceMap as ReferenceMap }