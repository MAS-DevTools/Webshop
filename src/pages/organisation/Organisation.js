import React, {useEffect} from 'react';
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";


const Organisation = () => {
  useEffect(()=>{
    Base.prototype.SwitchPage(CSSProps.ID.Organisation);
  });
  return (
    <div>
        Organisation
    </div>
  );
};

export default Organisation;
