import "./ArticlePivotgit.css";
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

const ArticlePivot = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const { id, title, body } = props.data;
  return (
    <div className="post">
      <small>11{id}</small>
      <h1>title{title}</h1>
      <p>bodys{body}</p>
    </div>
  );
};

export default ArticlePivot;
