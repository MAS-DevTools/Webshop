import "./CategoryNavbar.css";
import React, { useEffect, useState } from "react";
import DictionaryProps from "../../data/constants/DictionaryProps";
import { useTranslation } from "react-i18next";
import CSSProps from "../../data/constants/CSSProps";
import AppSettings from "../../data/AppSettings";
import CategoryNavItem from "./controls/CategoryNavItem";
import Paths from "../../data/constants/Paths";
import ApiEndpoints from "../../data/constants/ApiEndpoints.js";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

const CategoryNavbar = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const override = css`
    display: block;
    margin: auto;
    border-color: var(--border-color);
    width: 100%;
  `;
  
  useEffect(() => {
    fetch(ApiEndpoints.GetAllCatogories)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((exception) => {
        setError(exception);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error)
    return (
      <div className={CSSProps.Body.BarLoader}>
        <h1 className={CSSProps.Body.ErrorMessage}>
          {t(DictionaryProps.Error)}
        </h1>
        <BarLoader
          css={override}
          size={150}
          loading={true}
          speedMultiplier={1.5}
        />
      </div>
    );

  if (loading)
    return (
      <div className={CSSProps.Body.BarLoader}>
        <BarLoader
          css={override}
          size={600}
          loading={loading}
          speedMultiplier={1.5}
        />
      </div>
    );

  return (
    <nav className={CSSProps.CategoryNavbar.Bar}>
      <ul className={CSSProps.CategoryNavbar.Navigation}>
        <CategoryNavItem
          key={DictionaryProps.All}
          category={""}
          path={Paths.Products}
          text={t(DictionaryProps.All)}
          onClickPageID={DictionaryProps.All}
        />
        {products.map((category) => (
          <CategoryNavItem
            key={category}
            category={category}
            path={Paths.Products}
            text={category}
            onClickPageID={category}
          />
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;
