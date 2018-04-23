import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class SearchList extends Component {
	constructor(props) {
		super(props);
	};

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.element)
	}

	render() {
		const { items } = this.props;

		return (
			<div className="search-box-list">
				<ul>
					{items}
				</ul>
			</div>
		);
	};
};