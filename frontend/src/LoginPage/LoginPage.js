import React, { Component } from 'react';

import { userActions } from '../actions';


export class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleChange(event) {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	handleSubmit(event) {
		event.preventDefault();
		const { username, password } = this.state;
		const { login } = this.props;
		
		this.setState({submitted: true});
		if (username && password) {
			login(username, password);
		};
	};

	render() {
		const { username, password, submitted } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="username">Username</label>
				<input 
					type="text" 
					name="username" 
					value={this.state.username} 
					onChange={this.handleChange}
				/>
				{submitted && !username &&
					<div>Username is required</div>
				}

				<label htmlFor="password">Password</label>
				<input 
					type="password" 
					name="password" 
					value={this.state.password} 
					onChange={this.handleChange}
				/>
				{submitted && !password &&
					<div>Password is required</div>
				}

				<button type="submit">Login</button>
			</form>
		);
	};
};