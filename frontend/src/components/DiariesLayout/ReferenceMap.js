import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class ReferenceMap extends Component {
	constructor(props) {
		super(props);
	};

	handleClick(event) {
		event.preventDefault();

		const { showDiaries } = this.props;

		showDiaries();
	};

	render() {
		const linksList = this.props.linksList
		
		return (
			<div className='reference-map'>
				<span onClick={(e) => this.handleClick(e)}>diaries</span>
			</div>
		);
	};
};