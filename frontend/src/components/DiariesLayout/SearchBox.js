import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import { ReferenceMap } from '../../containers/DiariesLayout';
import { SearchList } from './SearchList';


export class SearchBox extends Component {
	constructor(props) {
		super(props);
	};

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.element)
	};

	render() {
		const { items, loading } = this.props;
		const content = loading ? (
			<ReactLoading 
				className='loading'
				type='spin' 
				color='blue' 
				height={40} 
				width={40} />
		) : (
			<SearchList items={items} />
		);
		
		return (
			<div className="search-box">
				<ReferenceMap />
				{content}
			</div> 
		);
	};
};