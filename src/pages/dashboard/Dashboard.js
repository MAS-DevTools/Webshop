import React, { useEffect } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";

const Dashboard = () => {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Dashboard);
  });
  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
