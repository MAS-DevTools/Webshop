import { Base } from "../../components/Base";
import React, { useEffect, useState } from "react";
import CSSProps from "../../data/constants/CSSProps";
import { Validator } from "../../tools/Validator";
import { RegisterModel } from "../../data/models/RegisterModel";
import { User } from "../../data/models/User";
import Constants from "../../data/constants/Constants";

const Settings = () => {
  const [errors, setErrors] = useState([]);
  

  function handleRegister(event) {
    let arr = [];
    RegisterModel.forEach((x) => {
      if (Validator.prototype.isEmpty(document.getElementById(x.id).value)) {
        if (
          errors.filter((error) => error.key === x.id).length === 0 &&
          x.required === true
        )
          arr.push({
            key: x.id,
            value: (
              <p key={x.id} className={CSSProps.Settings.Errormessage}>
                Invalid input
              </p>
            ),
          });
      }
    });
    if (
      document.getElementById(Constants.RegiterModel.Password).value !==
      document.getElementById(Constants.RegiterModel.ConfirmPassword).value
    ) {
      alert("Invalid password");
      event.preventDefault();
      return;
    }

    setErrors(arr.filter((error) => error !== null));

    if (errors.length !== 0) {
      alert("Errors found.");
      event.preventDefault();
      return;
    }

    User.email = document.getElementById(Constants.RegiterModel.Email).value;
    User.username = document.getElementById(Constants.RegiterModel.Email).value;
    User.password = document.getElementById(
      Constants.RegiterModel.Password
    ).value;
    User.name.firstname = document.getElementById(
      Constants.RegiterModel.Firstname
    ).value;
    User.name.lastname = document.getElementById(
      Constants.RegiterModel.Lastname
    ).value;
    User.address.city = document.getElementById(
      Constants.RegiterModel.City
    ).value;
    User.address.street = document.getElementById(
      Constants.RegiterModel.Street
    ).value;
    User.address.number = document.getElementById(
      Constants.RegiterModel.Number
    ).value;
    User.address.addition = document.getElementById(
      Constants.RegiterModel.Addition
    ).value;
    User.address.zipcode = document.getElementById(
      Constants.RegiterModel.Zipcode
    ).value;
    User.phone = document.getElementById(Constants.RegiterModel.Phone).value;
    //registerUser(User);
    alert("Succes!");
    event.preventDefault();
    return;
  }

  const validateInput = async (value, prop) => {
    if (prop.required === false) {
      return;
    }
    //Clean up old errors
    errors.forEach((element) => {
      if (prop.id === element.key) {
        var index = errors.indexOf(element);
        errors.splice(index, 1);
      }
    });

    setErrors(errors.filter((error) => error.key !== prop.id));

    if (prop.type === Constants.Types.String) {
      if (!value)
        setErrors([
          ...errors,
          {
            key: prop.id,
            value: (
              <p className={CSSProps.Settings.Errormessage}>
                This field can not be Empty!
              </p>
            ),
          },
        ]);
    } else if (prop.type === Constants.Types.Number) {
      if (!value)
        setErrors([
          ...errors,
          {
            key: prop.id,
            value: (
              <p className={CSSProps.Settings.Errormessage}>
                This field can not be Empty!
              </p>
            ),
          },
        ]);
    }
  };

  const validateOnLeave = async (value, prop) => {
    if (prop.id === Constants.RegiterModel.Email) {
      if (!Validator.prototype.validateEmail(value)) {
        if (errors.filter((error) => error.key === prop.id).length === 0)
          setErrors([
            ...errors,
            {
              key: prop.id,
              value: (
                <p className={CSSProps.Settings.Errormessage}>Invalid email!</p>
              ),
            },
          ]);
      }
    }
  };

  const [token, setToken] = useState(null);

  useEffect(() => {
    setTimeout(()=>{
      Base.prototype.SwitchPage(CSSProps.ID.Settings);
    },500);
  });

  useEffect(() => {
    Base.prototype.getToken().then((result) => {
      if (token === null || (token && !result)) {
        setToken(result);
      }
    });
  }, [token, setToken]);

  if (token) {
  return (
  <div>

          <form onSubmit={handleRegister}>
          <h1>Please register here</h1>
            {RegisterModel.map((prop) => {
              return (
                <label key={prop.id} className={CSSProps.Settings.Loginlabel}>
                  <p>{prop.languageKey}</p>
                  <input
                    className={CSSProps.Settings.El}
                    id={prop.id}
                    type={prop.type}
                    onChange={(e) => {
                      validateInput(e.target.value, prop);
                    }}
                    onBlur={(e) => {
                      validateOnLeave(e.target.value, prop);
                    }}
                    autoComplete={prop.autoComplete}
                  />
                  {errors
                    .filter((error) => error.key.includes(prop.id))
                    .map((e) => e.value)}
                </label>
              );
            })}
            <div className={CSSProps.Settings.LoginbuttonArea}>
              <button
                className={CSSProps.Settings.Loginbutton}
                type={Constants.Types.Submit}
                value={Constants.Types.Submit}
              >
                Submit
              </button>
              <button
                className={CSSProps.Settings.Loginbutton}
                onClick={() => {
         
                }}
              >
                Cancel
              </button>
            </div>
          </form>
  </div>);
  }else{
    
    return <div>Settings</div>;
  }
};

export default Settings;
