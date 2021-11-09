import "./Header.css";
import { ReactComponent as Logo } from "../../icons/Marvin express.svg";
import AppSettings from "../../data/AppSettings";
import CSSProps from "../../data/constants/CSSProps";

const Header = () => {
  return (
    <header className={CSSProps.Header.Area}>
      <h1>{AppSettings.ApplicationName}</h1>
      <Logo className={CSSProps.Header.Logo}></Logo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus massa
      est, rutrum a feugiat quis, ullamcorper ac purus. Proin sed consequat
      ligula. Mauris facilisis condimentum augue, sit amet volutpat metus
      vehicula sit amet. Quisque a vehicula eros, sed interdum massa. 
    </header>
  );
};

export default Header;
