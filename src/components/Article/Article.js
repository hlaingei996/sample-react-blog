import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class Article extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Link to={'/articles/'+this.props.article.id}>
          <h2>
            {this.props.article.title} 
          </h2>
        </Link>
        <p>{this.props.article.content}</p>
        <hr />
      </React.Fragment>
    );
  }
}