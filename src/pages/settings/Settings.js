import React, { useEffect } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";

const Settings = () => {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Settings);
  });
  return (
    <div>
      Settings
    </div>
  );
};

export default Settings;
