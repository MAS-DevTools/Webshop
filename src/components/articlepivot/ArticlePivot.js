import "./ArticlePivot.css";
import React, { useRef } from "react";
import DictionaryProps from "../../data/constants/DictionaryProps";
import { useTranslation } from "react-i18next";
import CSSProps from "../../data/constants/CSSProps";
import Counter from "../../components/counter/Counter.js";
import Paths from "../../data/constants/Paths";
import { Base } from "../../components/Base";
import AppSettings from "../../data/AppSettings";

const ArticlePivot = (props) => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const data = props.datasource;
  let count = useRef(0)

  function updateAmount(countChild) {
    
    count.current = countChild;
    
  }

  return (
    <div className="art">
      <figure className="articlepivot-figure">
        <img className="articlepivot-image" src={data.image} alt={Paths.None} />
      </figure>

      <div className="articleBody">
        <div className="articleBodyHeader paddingLR tRow tHeader">
          <small>Artilnummer{data.id}</small>
          <h3>{data.title}</h3>
        </div>
        <div className="articleBodyContent paddingLR tRow tBody">
          <p>{data.description}</p>
        </div>
        <div className="articleBodyFooter tRow tFooter">
          <div className="tRow tHeader">
            <Counter count={count.current} updateAmount={updateAmount} price={data.price} limit={999} />
          </div>
          <div className="paddingLR tRow tBody">
          <button className={CSSProps.Body.BtnAddToCart + " " + CSSProps.Body.FloatR + " "+ Base.prototype.CanOrder(data.stock)}  onClick={() =>{ if( count.current){data["quantity"]=count.current ; Base.prototype.addToCart(data); updateAmount(0); window.location.reload(false); }}}>{t(DictionaryProps.AddToCart)}</button>
             
          </div>
          <div className="paddingLR tRow tFooter">
          <div className={CSSProps.Body.FloatR} style={{color: Base.prototype.GetStockInfoColor(data.stock)}}>{data.stock} {t(Base.prototype.GetStockInfo(data.stock))}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePivot;
