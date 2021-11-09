import "../UserControl.css";
import DictionaryProps from "../../../data/constants/DictionaryProps";
import LocalStorageProps from "../../../data/constants/LocalStorageProps";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Language } from "../../../icons/Language.svg";
import Paths from "../../../data/constants/Paths";
import CSSProps from "../../../data/constants/CSSProps";
import AppSettings from "../../../data/AppSettings";
import { Validator } from "../../../tools/Validator";

const LanguageControl = () => {
  const [t, i18n] = useTranslation(AppSettings.TranslationFilename);
  let selectedLanguage = localStorage.getItem(LocalStorageProps.Language);

  if (Validator.prototype.isEmpty(selectedLanguage) === true) {
    selectedLanguage = AppSettings.EN;
  }
  
  useEffect(() => {
    CacheLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  },[selectedLanguage,i18n]);
  return (
    <li className={CSSProps.UserControl.Item + CSSProps.UserControl.hasDropdown}>
      <a className={CSSProps.UserControl.Link} href={Paths.None} >
        <Language className={CSSProps.UserControl.Icon} />
        <span className={CSSProps.UserControl.Text}>
          {t(DictionaryProps.Language)}
        </span>
      </a>
      <ul className={CSSProps.UserControl.Dropdown}>
        <li
          id={AppSettings.NL}
          className={CSSProps.UserControl.DropdownItem}
          onClick={() => {
            i18n.changeLanguage(AppSettings.NL);
            CacheLanguage(AppSettings.NL);
          }}
        >
          <a href={Paths.None}>
            <span className={CSSProps.UserControl.DropdownText}>Nederlands</span>
          </a>
        </li>
        <li
          id={AppSettings.EN}
          className={CSSProps.UserControl.DropdownItem}
          onClick={() => {
            i18n.changeLanguage(AppSettings.EN);
            CacheLanguage(AppSettings.EN);
          }}
        >
          <a href={Paths.None}>
            <span className={CSSProps.UserControl.DropdownText}>English</span>
          </a>
        </li>
      </ul>
    </li>
  );
};

function CacheLanguage(language) {
  let selectedLanguage = localStorage.getItem(LocalStorageProps.Language);

  if (Validator.prototype.isEmpty(selectedLanguage) === false) {
    const selectedButton = document.getElementById(selectedLanguage);
    selectedButton.style.cssText = CSSProps.Style.None;
  }

  const newSelectedButton = document.getElementById(language);
  newSelectedButton.style.cssText = CSSProps.Style.ItemSelected;

  localStorage.removeItem(LocalStorageProps.Language);
  localStorage.setItem(LocalStorageProps.Language, language);
}
export default LanguageControl;
