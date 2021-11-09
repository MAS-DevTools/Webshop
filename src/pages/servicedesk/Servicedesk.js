import React, {useEffect} from 'react';
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";


const Servivedesk = () => {
  useEffect(()=>{
    Base.prototype.SwitchPage(CSSProps.ID.Servivedesk);
  });
  return (
    <div>
        Servivedesk
    </div>
  );
};

export default Servivedesk;
