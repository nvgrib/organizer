import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { diariesActions } from '../../actions';


export class DiaryForm extends Component {
	constructor(props) {
		super(props);

		const userId = this.props.userId;
		const { id, title, miniature, common } = this.props.diary;
		this.state = {
			userId,
			id, 
			title, 
			miniature, 
			common
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	};

	static defaultProps = {
		diary: {
			title: '',
			common: false
		}
	};

	static propTypes = {
		userId: PropTypes.number,
		diary: PropTypes.object,
		buttonValue: PropTypes.string,
		submit: PropTypes.func
	};
	
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			userId: nextProps.userId,

			id: nextProps.diary.id,
			title: nextProps.diary.title,
			miniature: nextProps.diary.miniature,
			common: nextProps.diary.common

		};
	};

	handleInputChange(event){
		const { name, value} = event.target;
		
		this.setState({
			[name]: value
		});
	};

	handleCheckboxChange(event) {
		const { name, checked} = event.target;
		
		this.setState({
			[name]: checked
		});
	};

	handleFileChange(event) {
		this.setState({
			miniature: event.target.files[0]
		});
	};

	handleFormSubmit(event) {
		event.preventDefault();

		const submit = this.props.submit;
		const diary = {
			user: this.state.userId,
			id: this.state.id,
			title: this.state.title,
			miniature: null,
			common: this.state.common
		};

		submit(diary);
	};

	render() {
		const {title, common } = this.state;

		return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
					<input 
						type="text"
						name="title"
						value={title} 
						placeholder="Title" 
						onChange={this.handleInputChange}
					/>
					<input 
						type="file"
						name="miniature"
						onChange={this.handleFileChange}
						plaseholder="Image"
					/>
					<input 
						type="checkbox" 
						name="common"
						checked={common}
						onChange={this.handleCheckboxChange} 
					/>
					
					<button type="submit">{this.props.buttonValue}</button>
				</form>
			</div>
		);
	};
};