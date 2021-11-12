import "./Article.css";
import CSSProps from "../../data/constants/CSSProps";
import Paths from "../../data/constants/Paths";
import React from "react";
import { NavLink } from "react-router-dom";
import Counter from "../../components/counter/Counter.js"
import AppSettings from "../../data/AppSettings";
import { withTranslation } from 'react-i18next';
import DictionaryProps from "../../data/constants/DictionaryProps.js";

const minStock = 4;
function GetStockInfoColor(stock){
  if(stock === undefined)
    return CSSProps.Warning.Red;
  else if(stock === 0)
    return CSSProps.Warning.Red;
  else if(stock < minStock)
    return CSSProps.Warning.Orange;
  else if(stock >= minStock)
    return CSSProps.Warning.Green;
}
function GetStockInfo(stock){
  if(stock === undefined)
      return DictionaryProps.NoStockInfo;
  else if(stock === 0)
    return DictionaryProps.NotInStock;
  else if(stock < 5)
    return DictionaryProps.StockAlmostEmpty;
  else if(stock >= 5)
    return DictionaryProps.InStock;
}

function CanOrder(stock){
  if(stock === undefined ||stock === 0)
      return CSSProps.Article.Disabled;
  else
    return "";
}

class Article extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <article className={CSSProps.Article.Area + " " + this.props.parentClassName}>
        <NavLink className={CSSProps.Article.Area  } to={this.props.to}>
          <figure className={CSSProps.Article.Figure}>
            <img
              className={CSSProps.Article.Image}
              src={this.props.img}
              alt={Paths.None}
            />
          </figure>
        </NavLink>
          <div className={CSSProps.Article.Body}>
            <h2 className={CSSProps.Article.Title}>{this.props.title}</h2>
            <div className={CSSProps.Article.Content}> <b>{t(DictionaryProps.Description)}</b><br/>{this.props.content}<br/><br/>{this.props.info}</div>
            <Counter price={this.props.price} limit={this.props.stock}/>
            <footer className={CSSProps.Article.Info}>
              <button className={CSSProps.Article.BtnAddToCart + " " + CSSProps.Article.FloatR + " "+ CanOrder(this.props.stock)} >{t(DictionaryProps.AddToCart)}</button>
              <div className={CSSProps.Article.FloatL} style={{color: GetStockInfoColor(this.props.stock)}}>{this.props.stock} {t(GetStockInfo(this.props.stock))}</div>
              
            </footer>
            
          </div>
        
      </article>
    );
  }
}

export default withTranslation(AppSettings.TranslationFilename) (Article);
