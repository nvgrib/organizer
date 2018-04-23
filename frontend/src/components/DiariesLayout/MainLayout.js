import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class MainLayout extends Component {
	constructor(props) {
		super(props);
	};

	static propTypes = {
		form: PropTypes.element
	};

	render() {
		return (
			<div className="main-layout">
				{this.props.getForm()}
			</div>
		);
	};
};