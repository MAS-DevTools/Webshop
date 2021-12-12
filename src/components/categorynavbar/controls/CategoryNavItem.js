import "../CategoryNavbar.css";
import CSSProps from "../../../data/constants/CSSProps";
import React from "react";
import ClickSound from "../../../audio/mixkit-mouse-click-close-1113.wav";
import { NavLink } from "react-router-dom";

class CategoryNavItem extends React.Component {
  render() {
    return (
      <li
        className={CSSProps.CategoryNavbar.Item}
      >
        <NavLink
          to={this.props.path+"/"+ this.props.category}
          className={CSSProps.CategoryNavbar.Link}
        >
          <span className={CSSProps.NavBar.Text}>{this.props.text}</span>
          <audio id={this.props.iconID + CSSProps.ID.Audio} src={ClickSound} />
        </NavLink>
      </li>
    );
  }
}

export default CategoryNavItem;
