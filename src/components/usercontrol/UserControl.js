import "./UserControl.css";
import React from "react";
import ThemeControl from "./controls/ThemeControl";
import LanguageControl from "./controls/LanguageControl";
import CSSProps from "../../data/constants/CSSProps";
import VolumeControl from "./controls/VolumeControl";

const Navbar = () => {
  
  
  return (

    <nav className={CSSProps.UserControl.Bar}>
      <ul className={CSSProps.UserControl.Navigation}>
        <VolumeControl/>
        <LanguageControl/>
        <ThemeControl/>
      </ul>
    </nav>
  );
};

export default Navbar;
