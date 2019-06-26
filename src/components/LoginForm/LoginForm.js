import React from 'react';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.name = React.createRef();
		this.password = React.createRef();
	}

	handleOnSubmit = (event) => {
		event.preventDefault();
	}

	render() {
		return(
			<form onSubmit={this.handleOnSubmit}>
		        <label htmlFor="user_name">User Name : </label>
		        <input id="user_name" ref={this.name} required />
		        <br />
		        <label htmlFor="password">Password</label>
		        <input type="password" ref={this.password} required id="password" />
		        <br />
		        <button type="submit">Login</button>
		      </form>
		)
	}
}

export default LoginForm;