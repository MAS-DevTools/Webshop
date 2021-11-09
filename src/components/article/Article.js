import "./Article.css";
import CSSProps from "../../data/constants/CSSProps";
import Paths from "../../data/constants/Paths";
import React from "react";
import { NavLink } from "react-router-dom";

class Article extends React.Component {
  render() {
    return (
      <article className={CSSProps.Article.Area}>
        <NavLink className={CSSProps.Article.Area +CSSProps.Article.FirstArticle} to={this.props.to}>
          <figure className={CSSProps.Article.Figure}>
            <img
              className={CSSProps.Article.Image}
              src={this.props.img}
              alt={Paths.None}
            />
          </figure>
          <div className={CSSProps.Article.Body}>
            <h2 className={CSSProps.Article.Title}>{this.props.title}</h2>
            <p className={CSSProps.Article.Content}>{this.props.content}</p>
            <footer className={CSSProps.Article.Info}>{this.props.info}</footer>
          </div>
        </NavLink>
      </article>
    );
  }
}

export default Article;
