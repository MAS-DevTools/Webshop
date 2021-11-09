import React, {useEffect} from 'react';
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";


const Tasks = () => {
  useEffect(()=>{
    Base.prototype.SwitchPage(CSSProps.ID.Tasks);
  });
  return (
    <div>
        Tasks
    </div>
  );
};

export default Tasks;
