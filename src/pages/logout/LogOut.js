import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import Paths from "../../data/constants/Paths";

const LogOut = () => {
  const history = useHistory();
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.LogOut);
    Base.prototype.setToken(null);
    setTimeout(() => {
      history.push(Paths.Home);
      window.location.reload(true);
    }, 2000);
  });
  return <div><center><h1>Bye!</h1></center></div>;
};

export default LogOut;
