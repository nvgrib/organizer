import React from 'react';
import { connect } from 'react-redux';

import { diaryListActions } from '../../actions';
import { MainLayout } from '../../components/DiariesLayout/MainLayout';
import { DiaryForm } from '../../components/DiariesLayout/DiaryForm';
import { EntryForm } from '../../components/DiariesLayout/EntryForm';


function mapStateToProps(state, ownProps) {
	const userId = state.authentication.user.id;
	const { formType, chosenDiary, chosenEntry } = state.diaryList;
	const diary = getDiaryFromState(state, chosenDiary);
	const entry = getEntryFromState(state, chosenEntry);

	return { 
		userId,
		diaryId: chosenDiary,
		formType,
		diary,
		entry
	};

	function getDiaryFromState(state, id) {
		const diaries = state.diaryList.diaries;
		let diary = {};

		diaries.forEach(item => {
			if (item.id == id) {
				diary = item
			}
		});
		
		return diary;
	};

	function getEntryFromState(state, id) {
		const entries = state.diaryList.entries;
		let entry = {};
		
		entries.forEach(item => {
			if (item.id == id) {
				entry = item
			}
		});

		return entry;
	};
};

function mapDispatchToProps(dispatch, ownProps) {
	const { createDiary, updateDiary, createEntry, updateEntry } = diaryListActions;

	return {
		createDiary: diary => dispatch(createDiary(diary)),
		updateDiary: diary => dispatch(updateDiary(diary)),
		createEntry: entry => dispatch(createEntry(entry)),
		updateEntry: entry => dispatch(updateEntry(entry))
	}; 
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { userId, diaryId, formType, diary, entry } = stateProps;
	const { createDiary, updateDiary, createEntry, updateEntry } = dispatchProps;
	
	switch (formType) {
		case 'DIARY_CREATE':
			return { 
				getForm: () => (
					<DiaryForm 
						userId={userId} 
						buttonValue='Create' 
						submit={createDiary} 
					/>
				)
			};

		case 'DIARY_UPDATE':
			return {
				getForm: () => (
					<DiaryForm 
						userId={userId} 
						diary={diary} 
						buttonValue='Update' 
						submit={updateDiary} 
					/>)
			};

		case 'ENTRY_CREATE':
			return {
				getForm: () => (
					<EntryForm 
						userId={userId} 
						diaryId={diaryId} 
						buttonValue='Create' 
						submit={createEntry} 
					/>
				)
			};

		case 'ENTRY_UPDATE':
			return {
				getForm: () => (
					<EntryForm 
						userId={userId} 
						diaryId={diaryId}
						entry={entry} 
						buttonValue='Update' 
						submit={updateEntry} 
					/>
				)
			};
	};
};
	
const connectedMainLayout = connect(
	mapStateToProps, 
	mapDispatchToProps, 
	mergeProps)
(MainLayout);
export { connectedMainLayout as MainLayout }