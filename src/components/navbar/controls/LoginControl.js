import "../Navbar.css";
import React from "react";
import { ReactComponent as Login } from "../../../icons/Profile.svg";
import { useTranslation } from "react-i18next";
import DictionaryProps from "../../../data/constants/DictionaryProps";
import Paths from "../../../data/constants/Paths";
import CSSProps from "../../../data/constants/CSSProps";
import AppSettings from "../../../data/AppSettings";
import { Base } from "../../Base";
import ClickSound from "../../../audio/mixkit-mouse-click-close-1113.wav";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const LoginControl = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [token, setToken] = useState(null);
  let text;
  useEffect(() => {
    Base.prototype.getToken().then((result) => {
      if (token === null || (token && !result)) {
        setToken(result);
      }
    });
  }, [token, setToken]);

  if (token) {
    console.log("logintoken");
    console.log(token);
    text = t(DictionaryProps.Greetings.Welcome, { name: token.email });
  } else {
    text = "Login";
  }
  return (
    <li
      className={CSSProps.NavBar.Item + CSSProps.NavBar.NameTag}
      onClick={() => Base.prototype.SwitchPage(CSSProps.ID.Login)}
    >
      <NavLink to={Paths.Login} className={CSSProps.NavBar.Link}>
        <Login id={CSSProps.ID.Login} className={CSSProps.NavBar.Icon}></Login>
        <span className={CSSProps.NavBar.Text}>{text}</span>
        <audio id={CSSProps.ID.Login + CSSProps.ID.Audio} src={ClickSound} />
      </NavLink>
      
    </li>
  );
};

export default LoginControl;
