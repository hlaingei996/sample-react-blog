import React from "react";
import Article from "../Article";
import { connect } from "react-redux";
import { fetchArticles } from '../../actions/articleAction';
import { fetchUsers } from '../../actions/userAction';

class ArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetchArticles();
    this.props.fetchUsers();
  }

  render() {
    const articles = this.props.articles;
    const users = this.props.users;

    if(articles !== undefined) {
      return articles.map((article, index) => {
        const author = users.find(obj => obj.id === article.created_by);
        return <Article key={index} article={article} author={author} />;
      });
    }
    
    return null;
    
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  users: state.users
});

const mapDispatchToProps = {
  fetchArticles,
  fetchUsers
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);