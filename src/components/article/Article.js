import "./Article.css";
import CSSProps from "../../data/constants/CSSProps";
import Paths from "../../data/constants/Paths";
import React from "react";
import { NavLink } from "react-router-dom";
import Counter from "../../components/counter/Counter.js"
import AppSettings from "../../data/AppSettings";
import { withTranslation } from 'react-i18next';
import DictionaryProps from "../../data/constants/DictionaryProps.js";
import { Base } from "../../components/Base";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      count:0,
    }

    this.updateAmount = this.updateAmount.bind(this)
  }

  updateAmount(count) {
    console.log(count);
    this.setState({
      count :count,
    })
  }

  render() {
    const { t } = this.props;
    
    return (
      <article className={CSSProps.Article.Area + " " + this.props.parentClassName}>
        <NavLink className={CSSProps.Article.Area  } to={this.props.to}>
          <figure className={CSSProps.Article.Figure}>
            <img
              className={CSSProps.Article.Image}
              src={this.props.product.image}
              alt={Paths.None}
            />
          </figure>
        </NavLink>
          <div className={CSSProps.Article.Body}>
            <h2 className={CSSProps.Article.Title}>{this.props.product.title}</h2>
            <div className={CSSProps.Article.Content}> <b>{t(DictionaryProps.Description)}</b><br/>{this.props.product.description}<br/><br/>{this.props.product.category}</div>
            <Counter count={this.state.count} updateAmount={this.updateAmount} price={this.props.product.price} limit={999}/>
            <footer className={CSSProps.Article.Info}>
              <button className={CSSProps.Body.BtnAddToCart + " " + CSSProps.Body.FloatR + " "+ Base.prototype.CanOrder(this.props.product.stock)} value={this.props.product} onClick={() =>{ if(this.state.count !== 0){this.props.product["quantity"]=this.state.count; Base.prototype.addToCart(this.props.product); this.updateAmount(0); window.location.reload(false); }}}>{t(DictionaryProps.AddToCart)}</button>
              <div className={CSSProps.Body.FloatL} style={{color: Base.prototype.GetStockInfoColor(this.props.product.stock)}}>{this.props.product.stock} {t(Base.prototype.GetStockInfo(this.props.product.stock))}</div>
            </footer>
          </div>
      </article>
    );
  }
}

export default withTranslation(AppSettings.TranslationFilename) (Article);
