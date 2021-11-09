import "../UserControl.css";
import CSSProps from "../../../data/constants/CSSProps";
import React from "react";
import { SVGIcon } from "../../Icon";
import ClickSound from "../../../audio/mixkit-mouse-click-close-1113.wav";
import LocalStorageProps from "../../../data/constants/LocalStorageProps";
import { Validator } from "../../../tools/Validator";
import Paths from "../../../data/constants/Paths";

function getIcon() {
  let cachedValue = localStorage.getItem(LocalStorageProps.Volume);
  if (Validator.prototype.isEmpty(cachedValue)) {
    localStorage.setItem(LocalStorageProps.Volume, CSSProps.NavBar.VolumeOn);
    return localStorage.getItem(LocalStorageProps.Volume);
  }
  return cachedValue;
}


function Volume (){

  
    const [iconName, setName] = React.useState(getIcon());
    
    return (
      <li
        className={CSSProps.UserControl.Item}
        onClick={() => {
          localStorage.setItem(LocalStorageProps.Volume,iconName === CSSProps.UserControl.VolumeOn ? CSSProps.UserControl.VolumeOff : CSSProps.UserControl.VolumeOn);
          setName(iconName === CSSProps.UserControl.VolumeOn ? CSSProps.UserControl.VolumeOff : CSSProps.UserControl.VolumeOn);  
        }}
      >
        <a href={Paths.None} className={CSSProps.UserControl.Link}>
          <SVGIcon
            name={iconName}
            id={CSSProps.UserControl.name}
            className={CSSProps.UserControl.Icon + iconName}
            
          />
          <span className={CSSProps.UserControl.Text}></span>
          <audio id={CSSProps.ID.Volume + CSSProps.ID.Audio} src={ClickSound} />
        </a>
      </li>
    );
}

export default Volume;
