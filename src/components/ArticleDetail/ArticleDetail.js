import React from "react";

export default class ArticleDetail extends React.Component {
  render() {
      const id = this.props.match.params.id;
      const articles = this.props.articles;
      const currentArticle = articles.find( obj => obj.id == id);
      if (currentArticle == undefined) return <div>404 - Content not found</div>

      return (
        <React.Fragment>
        <h2>
          {currentArticle.title}
        </h2>
        <p>{currentArticle.content}</p>
        <hr />
      </React.Fragment>
     );
    }
  }
