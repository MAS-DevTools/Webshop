import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_nl from "./data/translations/nl/common.json";
import common_en from "./data/translations/en/common.json";
import AppSettings from "./data/AppSettings";
import App from "./App";


i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: AppSettings.EN,                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        nl: {
            common: common_nl
        },
    },
});
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
