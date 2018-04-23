import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class DiaryPreview extends Component {
	constructor(props) {
		super(props);

		this.handleDiaryClick = this.handleDiaryClick.bind(this);
		this.handleDiaryDoubleClick = this.handleDiaryDoubleClick.bind(this);
	};

	static propTypes = {
		diary: PropTypes.object.isRequired
	};

	handleDiaryClick(event, diaryId) {
		event.preventDefault();
		
		const { onItemClick } = this.props;
		
		onItemClick(diaryId);
	};

	handleDiaryDoubleClick(event, userId, diaryId) {
		event.preventDefault();
		
		const { onItemDoubleClick } = this.props;
		const params = {
			user: userId,
			diary: diaryId
		};
		
		onItemDoubleClick(params)
	};

	render() {
		const { diary, userId } = this.props;
	
		return (
			<div 
				className="diary-preview" 
				onClick={(e) => this.handleDiaryClick(e, diary.id)} 
				onDoubleClick={(e) => this.handleDiaryDoubleClick(e, userId, diary.id)}
			>
				<div>
					<img src={diary.miniature} />
				</div>
				<p>{diary.title}</p>
			</div>
		);
	};
};