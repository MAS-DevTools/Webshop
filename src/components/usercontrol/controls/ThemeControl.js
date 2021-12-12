import "../UserControl.css";
import { ReactComponent as Theme } from "../../../icons/Adjust.svg";
import CSSProps from "../../../data/constants/CSSProps";
import DictionaryProps from "../../../data/constants/DictionaryProps";
import LocalStorageProps from "../../../data/constants/LocalStorageProps";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppSettings from "../../../data/AppSettings";

const ThemeControl = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  var alterToggleName = DictionaryProps.Alternative;

  useEffect(() => {
    // DOM Elements

    const darkButton = document.getElementById(CSSProps.Style.Dark);
    const lightButton = document.getElementById(CSSProps.Style.Light);
    const solarButton = document.getElementById(CSSProps.Style.Alternative);
    const body = document.body;

    // Apply the cached theme on reload

    const theme = localStorage.getItem(LocalStorageProps.Theme);
    const isSolar = localStorage.getItem(LocalStorageProps.IsSolar);

    if (theme) {
      body.classList.add(theme);
      isSolar && body.classList.add(CSSProps.Style.Alternative);

      DeselectedButton();
      if (theme === CSSProps.Style.Dark) {
        darkButton.style.cssText = CSSProps.Style.ItemSelected;
      } else {
        lightButton.style.cssText = CSSProps.Style.ItemSelected;
      }
    } else {
      body.classList.add(CSSProps.Style.Light);
      isSolar && body.classList.add(CSSProps.Style.Alternative);
      localStorage.setItem(LocalStorageProps.Theme, CSSProps.Style.Light);
      DeselectedButton();
      lightButton.style.cssText = CSSProps.Style.ItemSelected;
      solarButton.style.cssText = CSSProps.Style.BGThemeButton;
    }

    if (isSolar) {
      solarButton.style.cssText = CSSProps.Style.BGThemeButton;
      solarButton.innerText = t(DictionaryProps.Normalize);
    }

    // Button Event Handlers

    darkButton.onclick = () => {
      DeselectedButton();
      darkButton.style.cssText = CSSProps.Style.ItemSelected;
      body.classList.replace(CSSProps.Style.Light, CSSProps.Style.Dark);
      localStorage.setItem(LocalStorageProps.Theme, CSSProps.Style.Dark);

      if (body.classList.contains(CSSProps.Style.Alternative)) {
        solarButton.style.cssText = CSSProps.Style.BGThemeButton;
      } else {
        solarButton.style.cssText = CSSProps.Style.BGThemeButton;
      }
    };

    lightButton.onclick = () => {
      DeselectedButton();
      lightButton.style.cssText = CSSProps.Style.ItemSelected;
      body.classList.replace(CSSProps.Style.Dark, CSSProps.Style.Light);
      localStorage.setItem(LocalStorageProps.Theme, CSSProps.Style.Light);

      if (body.classList.contains(CSSProps.Style.Alternative)) {
        solarButton.style.cssText = CSSProps.Style.BGThemeButton;
      } else {
        solarButton.style.cssText = CSSProps.Style.BGThemeButton;
      }
    };

    solarButton.onclick = () => {
      if (body.classList.contains(CSSProps.Style.Alternative)) {
        body.classList.remove(CSSProps.Style.Alternative);
        solarButton.style.cssText = CSSProps.Style.BGThemeButton;
        solarButton.innerText = t(DictionaryProps.Alternative);
        localStorage.removeItem(LocalStorageProps.IsSolar);
      } else {
        if (body.classList.contains(CSSProps.Style.Light)) {
          solarButton.style.cssText = CSSProps.Style.BGThemeButton;
        } else {
          solarButton.style.cssText = CSSProps.Style.BGThemeButton;
        }
        body.classList.add(CSSProps.Style.Alternative);
        solarButton.innerText = t(DictionaryProps.Normalize);

        localStorage.setItem(LocalStorageProps.IsSolar, true);
      }
    };
    function DeselectedButton() {
      solarButton.style.cssText = CSSProps.Style.None;
      darkButton.style.cssText = CSSProps.Style.None;
      lightButton.style.cssText = CSSProps.Style.None;
    }
  });

  return (
    <li
      className={CSSProps.UserControl.Item + CSSProps.UserControl.hasDropdown}
    >
      <button
        className={CSSProps.UserControl.Link + CSSProps.Body.ClearBtnBackground}
      >
        <Theme className={CSSProps.UserControl.Icon}></Theme>
        <span className={CSSProps.UserControl.Text}>
          {t(DictionaryProps.Theme)}
        </span>
      </button>
      <ul className={CSSProps.UserControl.Dropdown}>
        <li className={CSSProps.UserControl.DropdownItem}>
          <button
            id={CSSProps.Style.Light}
            className={CSSProps.Body.ClearBtnBackground}
          >
            <span className={CSSProps.UserControl.DropdownText}>
              {t(DictionaryProps.Light)}
            </span>
          </button>
        </li>
        <li className={CSSProps.UserControl.DropdownItem}>
          <button
            className={CSSProps.Body.ClearBtnBackground}
            id={CSSProps.Style.Dark}
          >
            <span className={CSSProps.UserControl.DropdownText}>
              {t(DictionaryProps.Dark)}
            </span>
          </button>
        </li>
        <li className={CSSProps.UserControl.DropdownItem}>
          <button
            className={CSSProps.Body.ClearBtnBackground}
            id={CSSProps.Style.Alternative}
          >
            <span className={CSSProps.UserControl.DropdownText}>
              {alterToggleName}
            </span>
          </button>
        </li>
      </ul>
    </li>
  );
};

export default ThemeControl;
