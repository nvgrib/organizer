import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class EntryPreview extends Component {
	constructor(props) {
		super(props);

		this.handleEntryClick = this.handleEntryClick.bind(this);
	};

	static propTypes = {
		entry: PropTypes.object.isRequired
	};

	handleEntryClick(event, entryId) {
		event.preventDefault();
		
		const { onItemClick } = this.props;

		onItemClick(entryId);
	};
	
	render() {
		const entry = this.props.entry;
		
		return (
			<div onClick={(e) => this.handleEntryClick(e, entry.id)} >
				<p>{entry.title}</p>
			</div>
		);
	};
};