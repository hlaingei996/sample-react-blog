import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<h1>Welcome from my page</h1>
					<Link exact to='/'>Home</Link> | <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
					
					<Route path='/register' render={ props => (<RegisterForm {...props} />) }>
					</Route>

					<Route path='/login' render={ props => (<LoginForm {...props} />) }>
					</Route>

				</div>
			</Router>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('root'));
