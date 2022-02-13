import "./CustomTable.css";
import React, { useEffect, useState } from "react";
import MultiSlider from "../sliders/MultiSlider";
import ArticleTable from "../articletable/ArticleTable";
import ClipLoader from "react-spinners/ClipLoader";
import DotLoader from "react-spinners/DotLoader";
import DictionaryProps from "../../data/constants/DictionaryProps.js";
import ArticlePivot from "../../components/articlepivot/ArticlePivot";
import { Base } from "../../components/Base";
import AppSettings from "../../data/AppSettings";
import { useTranslation } from "react-i18next";
import CSSProps from "../../data/constants/CSSProps";
import { css } from "@emotion/react";
import { useRef } from "react/cjs/react.development";

const CustomTable = ({ category }) => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(10000);
  let minCostFilter = useRef(0);
  let maxCostFilter = useRef(10000);
  
  if (category !== selectedCategory) {
    window.location.reload(true);
    setSelectedCategory(category);
  }
  
  const override = css`
    display: block;
    margin: auto;
    border-color: var(--border-color);
  `;
  
  function TogleFilter() {
    var element = document.getElementById("filterID");
    element.classList.toggle("filter-active");
  }

  function getMinOrMaxValue(value){
    if(loading || products.length ===0)
      return 0;
    
    let arr = Array.from(products.map(x => x.price));
    if(value === "min")
    {
      return Math.min(...arr);
    }else{
      return Math.max(...arr);
    }
  }

  function getProducts(){
    var test = products.filter(p => p.price >= minCostFilter.current && p.price <= maxCostFilter.current);
    return test;
  }
  
  useEffect(() => {
  
    Base.prototype.SwitchPage(CSSProps.ID.Products);
    const endpoint = Base.prototype.GetProductsEndpoint(selectedCategory);
    
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProducts(data);
        let arr = Array.from(data.map(x => x.price));
        setMinCost(Math.min(...arr));
        setMaxCost(Math.max(...arr));
      })
      .catch((exception) => {
        setError(exception);
      })
      .finally(() => {
        setLoading(false);
        
      });
  }, [selectedCategory]);

useEffect(()=>{
  
  if(minCost === 0 && maxCost === 0 && products.length >0)
  {
    
    let arr = Array.from(products.map(x => x.price));

    setMinCost(Math.min(...arr));
    setMaxCost(Math.max(...arr));
    minCostFilter.current = minCost;
    maxCostFilter.current = maxCost;

    return products.filter(p => p.price >= minCost && p.price <= maxCost);
  }else if(products.length >0){
    
    let arr = Array.from(products.map(x => x.price));
    setMinCost(Math.min(...arr));
    setMaxCost(Math.max(...arr));

    return products.filter(p => p.price >= minCostFilter.current && p.price <= maxCostFilter.current);
  }

}, [selectedCategory, products, minCost, maxCost])

  if (error)
    return (
      <div className={CSSProps.Body.Spinner}>
        <h1 className={CSSProps.Body.ErrorMessage}>
          {t(DictionaryProps.Home)}
        </h1>
        <DotLoader
          css={override}
          size={150}
          loading={true}
          speedMultiplier={1.5}
        />
      </div>
    );

  if (loading)
    return (
      <div className={CSSProps.Body.Spinner}>
        <ClipLoader
          css={override}
          size={150}
          loading={loading}
          speedMultiplier={1.5}
        />
      </div>
    );

  return (
    <div>
      <div className="customTable">
        <div className="tRow paginationTableHeader tHeader paddingLR">
          <button
            className="showFilterBtn clearBtnBackground"
            onClick={TogleFilter}
          >
            {t(DictionaryProps.ShowSearchOptions)}
          </button>
        </div>
        <div className="tRow customTableContent tBody">
          <div id="filterID" className="filter ">
            <div className="tRow tHeader">
              <h2>{t(DictionaryProps.FilterOptions)}</h2>
            </div>
            <div className="tRow tBody">
              
              <MultiSlider
                min={getMinOrMaxValue("min")}
                max={getMinOrMaxValue("max")}
                onMouseUp={({ min, max }) =>
                  {
                    minCostFilter.current = min;
                    maxCostFilter.current = max;
                    
                    setMinCost(min);
                    setMaxCost(max);
                  }
                }
                onChange={({ min, max }) => 
                {
                  minCostFilter.current = min;
                  maxCostFilter.current = max;

                }}
              />
            </div>
            <div className="tRow tFooter">
              
            </div>
          </div>
          <div className="tableArea">
            <ArticleTable
              data={getProducts()}
              RenderComponent={ArticlePivot}
              title={selectedCategory}
              pageLimit={5}
              dataLimit={10}
            />
          </div>
        </div>
        <div className="tRow paginationTableFooter tFooter paddingLR">
          
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
