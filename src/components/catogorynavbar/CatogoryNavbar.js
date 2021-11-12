import "./CatogoryNavbar.css";
import React, { useEffect, useState } from "react";
import DictionaryProps from "../../data/constants/DictionaryProps";
import { useTranslation } from "react-i18next";
import CSSProps from "../../data/constants/CSSProps";
import AppSettings from "../../data/AppSettings";
import CatogoryNavItem from "./controls/CatogoryNavItem";
import Paths from "../../data/constants/Paths";
import ApiEndpoints from "../../data/constants/ApiEndpoints.js";
import LogMessage from "../../data/constants/LogMessageProps.js";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

const CatogoryNavbar = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const override = css`
  display: block;
  margin:  auto;
  border-color: var(--border-color);
  width:100%;
`;
  useEffect(() => {
    
    fetch(ApiEndpoints.GetAllCatogories)
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
        console.log(LogMessage.FetchFailed, exception);
        setError(exception);
      })
      .finally(()=>{
        setLoading(false);
      });
  
  },[]);

  if(error)
    return (
      <div className={CSSProps.Body.BarLoader}>
        <h1 className={CSSProps.Body.ErrorMessage}>{t(DictionaryProps.Error)}</h1>
        <BarLoader css={override} size={150} loading={true} speedMultiplier={1.5} />
      </div>
    )

if(loading)
    return (
      <div className={CSSProps.Body.BarLoader}>
        <BarLoader css={override} size={600} loading={loading} speedMultiplier={1.5} />
      </div>
    )

  return (

    <nav className={CSSProps.CatogoryNavbar.Bar}>
      <ul className={CSSProps.CatogoryNavbar.Navigation}>
        {
            products.map(catogory =>  (
              <CatogoryNavItem key={catogory} path={Paths.Home} text={catogory} onClickPageID={catogory} />
            ))
          }
      </ul>
    </nav>
  );
};

export default CatogoryNavbar;
