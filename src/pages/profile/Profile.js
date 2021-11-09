import React, { useEffect } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";

const Profile = () => {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Profile);
  });
  return <div>Profile</div>;
};

export default Profile;
