import React from "react";
import CustomTable from "../../components/customtable/CustomTable";
import CSSProps from "../../data/constants/CSSProps";
import { ReactComponent as Arrowright } from "../../icons/Arrowright.svg";
import { useParams } from "react-router-dom";
import CategoryNavbar from "../../components/categorynavbar/CategoryNavbar";
import DictionaryProps from "../../data/constants/DictionaryProps";
import { useTranslation } from "react-i18next";
import AppSettings from "../../data/AppSettings";

const Products = () => {
  
  const [t] = useTranslation(AppSettings.TranslationFilename);
  let { category } = useParams();

  function GetCurrentCategory() {
    if (category === undefined) return "";
    else return <><Arrowright />{category}</>;
  }

  return (
    <div className={CSSProps.Body.Pages}>
      <CategoryNavbar />
      <div className={CSSProps.Products.SearchHeader + CSSProps.Body.PaddingLR}>
        
        <h2>
          {" "}
          <p className={CSSProps.Products.Logo}>
            {t(DictionaryProps.Products)}
            {GetCurrentCategory()}
          </p>{" "}
        </h2>
      </div>

      <CustomTable
        category={GetCurrentCategory()}
      />
    </div>
  );
};

export default Products;
