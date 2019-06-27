import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import NewArticleForm from "./components/NewArticleForm";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      user: {},
      users: [],
      articles: [],
      currentArticleIndex: {}
    };
  }

  componentDidMount() {
    this.localStorageRetrieval("users");
    this.localStorageRetrieval("articles");
  }

  registerEvent = (user, cb) => {
    const users = this.state.users;

    const result = users.find(
      obj => obj.name === user.name || obj.email === user.email
    );

    if (result === undefined) {
      console.log("add new user", user);
      user.id = users.length + 1;
      users.push(user);
      this.setStateAndLocalStorage("users", users);
      cb();
    } else {
      alert("User already existed");
    }
  };

  addNewArticleEvent = article => {
    const articles = this.state.articles;
    article.created_by = this.state.user.id;
    console.log(article);
    articles.push(article);
    this.setStateAndLocalStorage("articles", articles);
  };

  loginEvent = (user, cb) => {
    const users = this.state.users;
    const result = users.find(
      obj => obj.name === user.name && obj.password === user.password
    );

    if (result) {
      console.log(result);
      this.setState({
        isLogin: true,
        user: result
      });
      cb();
    } else {
      alert("Wrong password");
    }
  };

  logoutEvent = () => {
    this.setState({
      isLogin: false,
      user: {}
    });
  };

  localStorageRetrieval(key) {
    const data = localStorage.getItem(key);
    if (data !== null) {
      this.setState({
        [key]: JSON.parse(data)
      });
    }
  }

  setStateAndLocalStorage(key, value) {
    this.setState({
      [key]: value
    });
    localStorage.setItem(key, JSON.stringify(value));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Welcome to My Blog!</h1>
          <Link to="/">Home</Link> | <Link to="/login">SignIn</Link>
          {this.state.isLogin && (
            <React.Fragment>
              | <Link to="/article/new">New Article</Link>
            </React.Fragment>
          )}
          <br />
        </div>
        <Route
          path="/register"
          render={props => (
            <RegisterForm {...props} registerEvent={this.registerEvent} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <LoginForm {...props} loginEvent={this.loginEvent} />
          )}
        />
        <Route
          path="/article/new"
          render={props =>
            this.state.isLogin ? (
              <NewArticleForm
                {...props}
                addNewArticleEvent={this.addNewArticleEvent}
              />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />

        <Route
          path="/article/:id"
          exact
          render={props => (
            <ArticleDetail
              articles={this.state.articles}
              users={this.state.users}
            />
          )}
        />

        <Route
          path="/"
          exact
          render={props => (
            <ArticleList
              articles={this.state.articles}
              users={this.state.users}
            />
          )}
        />
      </Router>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);