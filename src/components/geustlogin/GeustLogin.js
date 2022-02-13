import "./GeustLogin.css";
import { GeustModel } from "../../data/models/GeustModel";
import Login from "../../pages/login/Login";
import { useTranslation } from "react-i18next";
import DictionaryProps from "../../data/constants/DictionaryProps.js";
import AppSettings from "../../data/AppSettings";
import { useEffect, useState } from "react/cjs/react.development";

const GeustLogin = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [component, setComponent] = useState(
    <Login
      RegisterModel={GeustModel}
      IsOrder={true}
      OnSuccesCallback={onSucces}
      OnFailCallback={onFail}
    />
  );
  var modal = document.getElementById("myModal");

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  function onSucces(result) {
    
    localStorage.setItem("cart", JSON.stringify([]));
 
    setComponent(
      <div>
        <img className="payedGif" src={"https://media0.giphy.com/media/vuvWCS793Bc8IEUZZv/giphy.gif?cid=790b761189047baf7ddaae73930b89f170261994c5c7f4a4&rid=giphy.gif&ct=g"} alt="Payed"/>
        <h1 className="payedText">Payed</h1>
      </div>
    );
    
    setTimeout(()=>{
         window.location.reload(false);
    });
  }

  function onFail(result) {    
    window.location.reload(false);
  }

  useEffect(() => {},[component]);

  return (
    <div className="geustlogin">
      <button
        id="myBtn"
        onClick={() => {
          var modal = document.getElementById("myModal");
          modal.style.display = "block";
        }}
      >
        {t(DictionaryProps.Order)}
      </button>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              var modal = document.getElementById("myModal");
              modal.style.display = "none";
            }}
          >
            &times;
          </span>
          {component}
        </div>
      </div>
    </div>
  );
};

export default GeustLogin;
