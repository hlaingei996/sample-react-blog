import React from 'react';

class RegisterForm extends React.Component {

	constructor(props) {
		super(props);
		this.name = React.createRef();
		this.email = React.createRef();
		this.password = React.createRef();
		this.confirm_password = React.createRef();
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
		        <label htmlFor="email">Email : </label>
		        <input id="email" ref={this.email} type="email" required />
		        <br />
		        <label htmlFor="password">Password</label>
		        <input type="password" ref={this.password} required id="password" />
		        <br />
		        <label htmlFor="confirm_password">Confirm Password</label>
		        <input
		          type="password"
		          ref={this.confirm_password}
		          required
		          id="confirm_password"
		        />
		        <br />
		        <button type="submit">Register</button>
		      </form>
		)
	}
}

export default RegisterForm;