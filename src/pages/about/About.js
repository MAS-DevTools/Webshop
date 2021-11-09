import "./About.css";
import React, {useEffect} from 'react';
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";

const About = () => {
  useEffect(()=>{
    Base.prototype.SwitchPage(CSSProps.ID.About);
  });
  return (
    <div className={CSSProps.About.Area}>
        About
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus odio augue, ut facilisis turpis blandit vel. Etiam dolor nulla, aliquam cursus tellus nec, rutrum interdum neque. Vivamus ut purus turpis. Phasellus dui ligula, faucibus sed maximus et, porttitor et magna. Nunc tincidunt ullamcorper rutrum. Fusce eget tincidunt nibh, sit amet elementum neque. Mauris cursus justo ipsum, et condimentum lacus luctus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla eu congue nisl. Aenean pharetra risus elit. Morbi ac augue ornare, varius dui sed, lacinia eros. Proin condimentum porta dui vitae tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse ut fringilla sapien. Cras pellentesque nibh suscipit consectetur bibendum.

Sed sit amet bibendum orci. Fusce vel semper justo, a lacinia elit. Morbi suscipit enim nec efficitur venenatis. Phasellus cursus sapien auctor, pulvinar leo a, efficitur turpis. Proin vehicula vulputate nulla, ut dictum mauris feugiat sed. Aenean viverra arcu ac dui suscipit consectetur. Pellentesque accumsan leo massa, eget suscipit turpis sollicitudin quis. Aliquam sagittis augue mattis ex accumsan dignissim. Curabitur posuere purus et leo pretium, non dapibus augue fringilla.
        </div>
    </div>
  );
};

export default About;
