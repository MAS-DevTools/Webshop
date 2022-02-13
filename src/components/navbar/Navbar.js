import "./Navbar.css";
import DictionaryProps from "../../data/constants/DictionaryProps";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginControl from "./controls/LoginControl";
import CSSProps from "../../data/constants/CSSProps";
import AppSettings from "../../data/AppSettings";
import { Base } from "../Base";
import NavItem from "./controls/NavItem";
import Paths from "../../data/constants/Paths";

const Navbar = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  let count = Base.prototype.getCartCount();
  
  return (

    <nav className={CSSProps.NavBar.Bar}>
      <ul className={CSSProps.NavBar.Navigation}>
        <NavItem path={Paths.Home} text={t(DictionaryProps.Home)} onClickPageID={CSSProps.ID.Home} iconID={CSSProps.ID.Home}/>
       
        <NavItem path={Paths.Servivedesk} text={t(DictionaryProps.Servicedesk)} onClickPageID={CSSProps.ID.Servivedesk} iconID={CSSProps.ID.Servivedesk}/>
        
        <NavItem path={Paths.Cart} text={t(DictionaryProps.MyCart)} onClickPageID={CSSProps.ID.Cart} iconID={CSSProps.ID.Cart} count={count}/>
        
        <NavItem path={Paths.Products} text={t(DictionaryProps.Products)} onClickPageID={CSSProps.ID.Products} iconID={CSSProps.ID.Products} />
        <LoginControl onClick={()=>Base.prototype.SwitchPage(CSSProps.ID.Login)}/>
      </ul>
    </nav>
  );
};

export default Navbar;
