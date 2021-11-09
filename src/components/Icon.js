import React from "react";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as About } from "../icons/About.svg";
import { ReactComponent as ServiceDesk } from "../icons/ServiceDesk.svg";
import { ReactComponent as Dashboard } from "../icons/Dashboard.svg";
import { ReactComponent as Settings } from "../icons/Settings.svg";
import { ReactComponent as Tasks } from "../icons/Tasks.svg";
import { ReactComponent as Sitemap } from "../icons/Sitemap.svg";
import { ReactComponent as VolumeOn } from "../icons/volume-up.svg";
import { ReactComponent as VolumeOff } from "../icons/volume-mute.svg";
import { ReactComponent as Services } from "../icons/shopping-cart.svg";

export class SVGIcon extends React.Component {
  render() {
    const iconTypes = {
      home : Home,
      about : About,
      servicedesk : ServiceDesk,
      dashboard : Dashboard,
      settings : Settings,
      tasks : Tasks,
      organisation : Sitemap,
      volumeOn : VolumeOn,
      volumeOff : VolumeOff,
      services : Services
    };

    let Icon = iconTypes[this.props.name];
    return <Icon id={this.props.id} className={this.props.className}  />;
  }
}
export default SVGIcon;
