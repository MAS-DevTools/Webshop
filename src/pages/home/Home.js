import "./Home.css";
import React, { useEffect, useState } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import Article from "../../components/article/Article.js";
import CategoryNavbar from "../../components/categorynavbar/CategoryNavbar";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import DotLoader from "react-spinners/DotLoader";
import ApiEndpoints from "../../data/constants/ApiEndpoints.js";
import DictionaryProps from "../../data/constants/DictionaryProps.js";
import AppSettings from "../../data/AppSettings";
import { useTranslation } from "react-i18next";

const Home = () => {
  
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const override = css`
  display: block;
  margin:  auto;
  border-color: var(--border-color);
`;


  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Home);
    
    fetch(ApiEndpoints.GetAllProducts)
      .then(response=> 
        {
          if(response.ok){
            return response.json();
          }
          throw response;
        })
      .then(data =>{
          setProducts(data);
        })
      .catch(exception =>{
        setError(exception);
      })
      .finally(()=>{
        setLoading(false);
      });
  
  },[]);
  
    if(error)
    return (
      <div className={CSSProps.Body.Spinner}>
        <h1 className={CSSProps.Body.ErrorMessage}>{t(DictionaryProps.Home)}</h1>
        <DotLoader css={override} size={150} loading={true} speedMultiplier={1.5} />
      </div>
    )

    if(loading)
    return (
      <div className={CSSProps.Body.Spinner}>
        <ClipLoader css={override} size={150} loading={loading} speedMultiplier={1.5} />
      </div>
    )

  return (
    <div className={CSSProps.Body.Pages}>
    <CategoryNavbar/>
      <div className={CSSProps.Body.Pages.Home.Columns}>
        <div className={CSSProps.Body.Pages.Home.Column}>
          {
            products.filter(product => product.id <= 3).map(product =>  (
              <Article parentClassName={CSSProps.Body.Pages.Home.Cell} key={product.id} product={product} to="www.google.nl" />//We are using [product.stock] for the stock property
            ))
          }
        </div>
        <div className={CSSProps.Body.Pages.Home.Column}>
          {
            products.filter(product => product.id >= 4 && product.id <= 6).map(product =>  (
              <Article parentClassName={CSSProps.Body.Pages.Home.Cell} key={product.id} product={product} to="www.google.nl" />
            ))
          }
        </div>
        <div className={CSSProps.Body.Pages.Home.Column}>
          {
            products.filter(product => product.id >= 7 && product.id <= 9).map(product =>  (
              <Article parentClassName={CSSProps.Body.Pages.Home.Cell} key={product.id} product={product} to="www.google.nl" />
            ))
          }
        </div>
        <div className={CSSProps.Body.Pages.Home.Column}>
          {
            products.filter(product => product.id >= 10 && product.id <= 12).map(product =>  (
              <Article parentClassName={CSSProps.Body.Pages.Home.Cell} key={product.id} product={product} to="www.google.nl" />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
