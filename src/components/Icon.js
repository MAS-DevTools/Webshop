import React from "react";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as About } from "../icons/About.svg";
import { ReactComponent as ServiceDesk } from "../icons/ServiceDesk.svg";
import { ReactComponent as Settings } from "../icons/Settings.svg";
import { ReactComponent as Orders } from "../icons/Orders.svg";
import { ReactComponent as Sitemap } from "../icons/Sitemap.svg";
import { ReactComponent as VolumeOn } from "../icons/volume-up.svg";
import { ReactComponent as VolumeOff } from "../icons/volume-mute.svg";
import { ReactComponent as Cart } from "../icons/shopping-cart.svg";
import { ReactComponent as Products } from "../icons/product.svg";

export class SVGIcon extends React.Component {
  render() {
    const iconTypes = {
      home : Home,
      cart : Cart,
      about : About,
      servicedesk : ServiceDesk,
      settings : Settings,
      orders : Orders,
      logout : Sitemap,
      volumeOn : VolumeOn,
      volumeOff : VolumeOff,
      products : Products
    };

    let Icon = iconTypes[this.props.name];
    return <Icon id={this.props.id} className={this.props.className}  />;
  }
}
export default SVGIcon;
