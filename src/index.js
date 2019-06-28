import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NewArticleForm from './components/NewArticleForm';
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isLogin : false,
			user : {},
			users : [],
			articles : [],
			currentArticleIndex : {}
		};
	}

	componentDidMount() {
		this.localStorageRetrieval("users");
		this.localStorageRetrieval("articles");
	}

	registerEvent = (user, cb) => {
		const users = this.state.users;
		console.log("users", users);

		const result = users.find(
			obj => obj.name === user.name || obj.email === user.email
		);

		if (result === undefined) {

			console.log("add new user", user);
			user.id = users.length + 1;
			users.push(user);
			this.setStateAndLocalStorage("users", users);
			cb();
		}
		else {
			alert("User already existed");
		}
	}

	loginEvent = (user, cb) => {
		const users = this.state.users;
		const result = users.find(
			obj => obj.name === user.name && obj.password === user.password
		);

		if (result) {
			this.setState({
				isLogin : true,
				user : result
			});
			cb();
		}
		else {
			alert("Wrong password");
		}
	}


	localStorageRetrieval(key) {
		const data = localStorage.getItem(key);
		if(data !== null) {
			this.setState({
				[key] : JSON.parse(data)
			});
		}
	}

	setStateAndLocalStorage(key, value) {
		this.setState({
			[key]: value
		});
		localStorage.setItem(key, JSON.stringify(value));
	}

	// addNewArticleEvent = (article) => {
	// 	const articles = this.state.articles;
	// 	const mapped_article_id = articles.map( i => parseInt(i.id));
	// 	const max = Math.max(...mapped_article_id);
	// 	article.id = max + 1;
	// 	article.create_by = this.state.user.id;
	// 	articles.push(article);
	// 	this.setStateAndLocalStorage("articles", articles);
	// }

	render() {
		return (
			<Router>
				<div className="App">
					<h1>Welcome to My Blog!</h1>
					<Link to="/">Home</Link> | <Link to="/login">SignIn</Link>
					{this.state.isLogin && (
						<React.Fragment>
						| <Link to='/article/new'>New Article</Link>
						</React.Fragment>
					)}
					<br />
					</div>

				<Route path='/register' render={ props => (<RegisterForm {...props} registerEvent={this.registerEvent} />) }></Route>

				<Route path='/login' render={ props => (<LoginForm {...props} loginEvent={this.loginEvent} />) }></Route>

				<Route 
					path='/article/new' 
					render={ props => this.state.isLogin ? 
						(
							<NewArticleForm {...props}  currentUser={this.state.user} />
						) :
						(
							<Redirect to={{
								pathname: '/login',
								state: { from: props.location }
							}} />
						)
				}>
				</Route>

				<Route
					path="/articles/:id"
					exact
					render={props => (
						<ArticleDetail
						{...props}
						articles={this.state.articles}
						users={this.state.users}
						/>
					)}
				/>

				<Route
					path="/"
					exact
					component={ArticleList}
					/>
			</Router>
		)
	}
}

const rootElement = document.getElementById("root");
const store = createStore(rootReducer,applyMiddleware(thunk))  ;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);