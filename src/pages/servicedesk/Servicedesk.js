import "./Servicedesk.css";
import React, { useEffect } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import DictionaryProps from "../../data/constants/DictionaryProps.js";
import AppSettings from "../../data/AppSettings";
import { useTranslation } from "react-i18next";

const Servivedesk = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Servivedesk);
  });
  return (
    <div>
      
      <div className="containerServiceDesk">
        <form  action="/action_page.php">
          <label for="fname">{t(DictionaryProps.Firstname)}</label>
          <input
          className="fieldtext"
            type="text"
            id="fname"
            name="firstname"
            placeholder={t(DictionaryProps.TypeHere)+t(DictionaryProps.Firstname).toLowerCase()+".."}
          />

          <label for="lname">{t(DictionaryProps.Lastname)}</label>
          <input
          className="fieldtext"
            type="text"
            id="lname"
            name="lastname"
            placeholder={t(DictionaryProps.TypeHere)+t(DictionaryProps.Lastname).toLowerCase()+".."}
          />

<label for="lemail">{t(DictionaryProps.Email)}</label>
          <input
          className="fieldtext"
            type="text"
            id="lemail"
            name="email"
            placeholder={t(DictionaryProps.TypeHere)+t(DictionaryProps.Email).toLowerCase()+".."}
          />
          <label for="subject">{t(DictionaryProps.TypeHere)+t(DictionaryProps.Question)+".."}</label>
          <textarea
          className="fieldtext h200"
            id="subject"
            name="subject"
            placeholder=".."

          ></textarea>

          <input className="fieldsubmit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Servivedesk;
