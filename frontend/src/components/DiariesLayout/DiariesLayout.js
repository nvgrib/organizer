import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MainLayout, SearchBox } from '../../containers/DiariesLayout';


export class DiariesLayout extends Component {
	constructor(props) {
		super(props);
	};

	render() {
		return ( 
			<div className="diaries-layout">
				<SearchBox />
				<MainLayout />
			</div>
		);
	};
};