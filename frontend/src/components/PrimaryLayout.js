import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { LoginPage } from '../containers/LoginPage';
import { Home } from './Home';
import { DiariesLayout } from './DiariesLayout';


export class PrimaryLayout extends Component {
	constructor(props) {
		super(props);

		this.handleDiariesLinkClick = this.handleDiariesLinkClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
	};

	handleDiariesLinkClick() {
		const params = {
			userId: this.props.user.id
		};

		this.props.onDiariesLinkClick(params);
	};

	handleLogoutClick() {
		this.props.onLogoutLinkClick();
	};


	render() {
		const { match } = this.props;
		return (
			<div className="primary-layout">
				<header className="primary-header">
					<p>There will be a picture, maybe...</p>
				</header>
				
				<aside className="primary-aside">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li>
							<Link 
								to="/diaries" 
								onClick={this.handleDiariesLinkClick}
							>
								Diaries
							</Link>
						</li>
						<li><Link to="/login">Login</Link></li>
						<li>
							<Link 
								to="/"
								onClick={this.handleLogoutClick}
							>
								Logout
							</Link>
						</li>

					</ul>
					<hr />
				</aside>
				
				<main>
					<Route exact path="/" component={Home}/>
      				<Route path="/diaries" component={DiariesLayout}/>
				</main>
			</div>
		);
	};
};