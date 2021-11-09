import "../Navbar.css";
import CSSProps from "../../../data/constants/CSSProps";
import { Base } from "../../Base";
import React from 'react';
import {SVGIcon} from "../../Icon";
import ClickSound from "../../../audio/mixkit-mouse-click-close-1113.wav";
import { NavLink } from "react-router-dom";

class NavItem extends React.Component {
    
    render() { 
      return ( 
      <li className={CSSProps.NavBar.Item} onClick={()=>Base.prototype.SwitchPage(this.props.onClickPageID)}>
        <NavLink to={this.props.path} className={CSSProps.NavBar.Link}>
          <SVGIcon name={this.props.iconID} id={this.props.iconID} className={CSSProps.NavBar.Icon}/>
          <span className={CSSProps.NavBar.Text}>{this.props.text}</span>
          <audio id={this.props.iconID + CSSProps.ID.Audio} src={ClickSound}/>
        </NavLink>
     </li>)
     };
}
 
export default NavItem;