import "./Sidebar.css";
import { ReactComponent as Arrow } from "../../icons/Arrow.svg";
import Paths from "../../data/constants/Paths";
import CSSProps from "../../data/constants/CSSProps";
import DictionaryProps from "../../data/constants/DictionaryProps";
import AppSettings from "../../data/AppSettings";
import { useTranslation } from "react-i18next";
import SideNavItem from "./controls/SideNavItem";

const Sidebar = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);

  return (
    <nav className={CSSProps.SideBar.Bar}>
      <ul className={CSSProps.SideBar.Navigation}>
        <li className={CSSProps.SideBar.Logo} >
          <a href={Paths.None} className={CSSProps.SideBar.Link}>
            <span className={CSSProps.SideBar.LinkText + CSSProps.SideBar.LogoText}>{AppSettings.ApplicationName}</span>
            <Arrow />
          </a>
        </li>
        <SideNavItem path={Paths.Orders} text={t(DictionaryProps.Orders)} onClickPageID={CSSProps.ID.Orders} iconID={CSSProps.ID.Orders}/>
        <SideNavItem path={Paths.LogOut} text={t(DictionaryProps.LogOut)} onClickPageID={CSSProps.ID.LogOut} iconID={CSSProps.ID.LogOut}/>
        <SideNavItem path={Paths.Settings} text={t(DictionaryProps.Settings)} onClickPageID={CSSProps.ID.Settings} iconID={CSSProps.ID.Settings}/>
      </ul>
    </nav>
  );
};

export default Sidebar;
