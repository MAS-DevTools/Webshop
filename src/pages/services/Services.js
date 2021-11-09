import React, { useEffect } from "react";
import { Base } from "../../components/Base";
import Header from "../../components/header/Header";
import CSSProps from "../../data/constants/CSSProps";

const Services = () => {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Services);
  });
  return  (
  <div>
    <Header className="Header" />
  </div>);
};

export default Services;
