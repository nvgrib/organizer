import React from 'react';
import { connect } from 'react-redux';

import { formTypeConstants, itemsFilterConstants } from '../../_constants';
import { diaryListActions } from '../../actions';
import { SearchBox } from '../../components/DiariesLayout/SearchBox';
import { DiaryPreview } from '../../components/DiariesLayout/DiaryPreview';
import { EntryPreview } from '../../components/DiariesLayout/EntryPreview';


function mapStateToProps(state, ownProps) {
	const { itemsFilter, diaries, entries, loading } = state.diaryList;
	const userId = state.authentication.user.id;

	return {
		itemsFilter,
		diaries,
		entries,
		userId,
		loading
	};
};

function mapDispatchToProps(dispatch, ownProps) {
	const { 
		setItemsFilter, 
		setFormType, 
		setChosenDiary, 
		setChosenEntry, 
		getEntries
	} = diaryListActions;
	
	return {
		onDiaryClick: (diaryId) => {
			dispatch(setChosenDiary(diaryId));
			dispatch(setFormType(formTypeConstants.DIARY_UPDATE));
		},
		onDiaryDoubleClick: (params) => {
			dispatch(getEntries(params));
			dispatch(setFormType(formTypeConstants.ENTRY_CREATE));
			dispatch(setItemsFilter(itemsFilterConstants.SHOW_ENTRIES));
		},
		onEntryClick: (entryId) => {
			dispatch(setChosenEntry(entryId));
			dispatch(setFormType(formTypeConstants.ENTRY_UPDATE));
		}
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { itemsFilter, diaries, entries, userId, loading } = stateProps;
	const { onDiaryClick, onDiaryDoubleClick, onEntryClick } = dispatchProps;

	switch (itemsFilter) {
		case itemsFilterConstants.SHOW_DIARIES:
			const diaryItems = diaries.map(diary => (
				<li key={diary.id}>
					<DiaryPreview 
						diary={diary} 
						onItemClick={onDiaryClick} 
						onItemDoubleClick={onDiaryDoubleClick} 
						userId={userId} 
					/>
				</li>
			));

			return { items: diaryItems, loading };

		case itemsFilterConstants.SHOW_ENTRIES:
			const entryItems = entries.map(entry => (
				<li key={entry.id}>
					<EntryPreview entry={entry} onItemClick={onEntryClick} />
				</li>
			));
			
			return { items: entryItems, loading };
	};
};

const connectedSearchBox = connect(
	mapStateToProps, 
	mapDispatchToProps, 
	mergeProps)
(SearchBox);
export { connectedSearchBox as SearchBox };
