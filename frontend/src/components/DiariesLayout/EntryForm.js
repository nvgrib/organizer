import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class EntryForm extends Component {
	constructor(props) {
		super(props);

		const userId = this.props.userId;
		const diaryId = this.props.diaryId;

		const {id, title, text, miniature, tags, common} = this.props.entry;
		this.state = {
			userId,
			diaryId,
			id,
			title,
			text,
			miniature,
			tags,
			common,

			tagsInputValue: tags.map(tag => tag.name).join(', '),
		};

		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	};

	static defaultProps = {
		entry: {
			title: '',
			text: '',
			tags: [],
			common: false
		}
	};

	static propTypes = {
		entry: PropTypes.object,
		formSubmit: PropTypes.func,
		buttonValue: PropTypes.string,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			userId: nextProps.userId,
			diaryId: nextProps.diaryId,

			id: nextProps.entry.id,
			title: nextProps.entry.title,
			text: nextProps.entry.text,
			miniature: nextProps.entry.miniature,
			tags: nextProps.entry.tags,
			common: nextProps.entry.common
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
		const entry = {
			user: this.state.userId,
			diary: this.state.diaryId,
			id: this.state.id,
			title: this.state.title,
			text: this.state.text,
			miniature: null,
			tags: null,
			common: this.state.common
		};

		submit(entry);
	};

	render() {
		const { title, text, common, tagsInputValue} = this.state;

		return (
			<div>
				<form onSubmit={(e) => this.handleFormSubmit(e)}>
					<input 
						type="text"
						name="title"
						value={title} 
						placeholder="Title" 
						onChange={this.handleInputChange}
					/>
					<input 
						type="text" 
						name="text"
						value={text} 
						placeholder="Text" 
						onChange={this.handleInputChange}
					/>
					<input 
						type="file"
						name="miniature"
						onChange={this.handleFileChange} 
						plaseholder="Image" 
					/>
					<input 
						type="text"
						name="tagsInputValue"
						value={tagsInputValue}
						onChange={this.handleInputChange}
						placeholder="family, love, happiness ..." 
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