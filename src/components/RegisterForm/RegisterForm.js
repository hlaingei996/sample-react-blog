import React from "react";
import {
  BrowserRouter as Redirect,
  Router,
  Route,
  Link
} from "react-router-dom";

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.confirm_password = React.createRef();
    this.state = {
      completeRegister: false
    };
  }

  handleOnSubmit = event => {
    event.preventDefault();
    if (this.password.current.value === this.confirm_password.current.value) {
      this.props.registerEvent(
        {
          name: this.name.current.value,
          email: this.email.current.value,
          password: this.password.current.value
        },
        () => {
          this.setState({
            completeRegister: true
          });
        }
      );
    }
  };

  render() {
    console.log(this.state.completeRegister);
    if (this.state.completeRegister) return <Redirect to="/" />;

    return (
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
        <Link to="/login">Login</Link>
      </form>
    );
  }
}
