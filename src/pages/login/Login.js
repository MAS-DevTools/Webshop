import "./Login.css";
import React, { useEffect, useState } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import { Validator } from "../../tools/Validator";
import { User } from "../../data/models/User";
import ApiEndpoints from "../../data/constants/ApiEndpoints";
import Constants from "../../data/constants/Constants";
import AppSettings from "../../data/AppSettings";
import { useTranslation } from "react-i18next";
import DictionaryProps from "../../data/constants/DictionaryProps.js";
import { useHistory } from "react-router-dom";

async function handleRequest(
  endpoint,
  token,
  body,
  succesCallback,
  failCallback
) {
  var email = token ? token?.email : "";
  var tokenvalue = token ? token?.token : "";

  fetch(endpoint.path, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      email: email,
      token: tokenvalue,
    },
    body: body,
  }).then((res) => {
    if (res.ok) {
      res.json().then((json) => {
        succesCallback(json);
      });
      return;
    }

    res.json().then((json) => {
      failCallback(json);
    });
  });
}

const Login = ({
  RegisterModel,
  IsOrder,
  OnSuccesCallback,
  OnFailCallback,
}) => {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Login);
  });

  const [t] = useTranslation(AppSettings.TranslationFilename);
  const [errors, setErrors] = useState([]);
  const [username, setUserName] = useState();
  const [showAddUser, setShowAddUser] = useState(CSSProps.Empty);
  const [showLoginUser, setShowLoginUser] = useState(CSSProps.Empty);
  const [shrinkPage, setShrinkPage] = useState(CSSProps.Login.ShrinkPage);
  const [password, setPassword] = useState();
  const history = useHistory();

  function handleNewUser(event) {
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
              <p key={x.id} className={CSSProps.Login.Errormessage}>
                {t(DictionaryProps.InvalidInput)}
              </p>
            ),
          });
      }
    });

    if (
      !IsOrder &&
      document.getElementById(Constants.RegiterModel.Password).value !==
        document.getElementById(Constants.RegiterModel.ConfirmPassword).value
    ) {
      alert(t(DictionaryProps.InvalidPassword));
      event.preventDefault();
      return;
    }

    setErrors(arr.filter((error) => error !== null));

    if (errors.length !== 0) {
      alert(t(DictionaryProps.ErrorsFound));
      event.preventDefault();
      return;
    }

    User.email = document.getElementById(Constants.RegiterModel.Email)?.value;
    User.username = document.getElementById(
      Constants.RegiterModel.Email
    )?.value;
    User.password = document.getElementById(
      Constants.RegiterModel.Password
    )?.value;
    User.name.firstname = document.getElementById(
      Constants.RegiterModel.Firstname
    )?.value;
    User.name.lastname = document.getElementById(
      Constants.RegiterModel.Lastname
    )?.value;
    User.address.city = document.getElementById(
      Constants.RegiterModel.City
    )?.value;
    User.address.street = document.getElementById(
      Constants.RegiterModel.Street
    )?.value;
    User.address.number = document.getElementById(
      Constants.RegiterModel.Number
    )?.value;
    User.address.addition = document.getElementById(
      Constants.RegiterModel.Addition
    )?.value;
    User.address.zipcode = document.getElementById(
      Constants.RegiterModel.Zipcode
    )?.value;
    User.birthday = document.getElementById(
      Constants.RegiterModel.Birthday
    )?.value;
    User.phone = document.getElementById(Constants.RegiterModel.Phone)?.value;

    if (IsOrder) {
      order(User);
    } else {
      handleRequest(
        { path: ApiEndpoints.Register, method: ApiEndpoints.Methods.POST },
        token,
        new URLSearchParams({ raw: JSON.stringify(User) }),
        () => login(User.email, User.password),
        (result) => onFail(result)
      );
    }
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
              <p className={CSSProps.Login.Errormessage}>
                {t(DictionaryProps.CantBeEmpty)}
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
              <p className={CSSProps.Login.Errormessage}>
                {t(DictionaryProps.CantBeEmpty)}
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
                <p className={CSSProps.Login.Errormessage}>Invalid email!</p>
              ),
            },
          ]);
      }
    }
  };

  var loginSucces = function (json) {
    if (json.result) {
      Base.prototype.setToken(json.result);
      setToken(json.result);
      if (IsOrder) {
        return;
      }
      OnSuccesCallback(json.result);
    }
  };

  var onFail = function (result) {
    alert("Something went wrong");
    OnFailCallback(result);
  };

  var login = function (u, p) {
    handleRequest(
      { path: ApiEndpoints.Login, method: ApiEndpoints.Methods.POST },
      token,
      new URLSearchParams({
        email: u,
        password: p,
      }),
      (result) => loginSucces(result),
      (result) => onFail(result)
    );
  };

  var order = function (user) {
    
    var cart = Base.prototype.getCart();
    
    if (cart && cart.length > 0) {
      handleRequest(
        { path: ApiEndpoints.Order, method: ApiEndpoints.Methods.POST },
        token,
        new URLSearchParams({
          raw: JSON.stringify({ cart: cart , user: user}),
        }),
        (result) => OnSuccesCallback(result),
        (result) => OnFailCallback(result)
      );
      return;
    }
    alert("Cart is empty!");
  };

  const [token, setToken] = useState(null);
  useEffect(() => {}, [errors, setErrors]);
  useEffect(() => {
    Base.prototype.getToken().then((result) => {
      if (token === null || (token && !result)) {
        setToken(result);
      }
    });
  }, [token, setToken]);

  if (!token) {
    return (
      <div className={CSSProps.Login.Area + shrinkPage}>
        <div className={CSSProps.Login.LoginUserBody + showLoginUser}>
          <h1>{t(DictionaryProps.PleaseLogIn)}</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              login(username, password);
            }}
          >
            <label className={CSSProps.Login.Loginlabel}>
              <div>
                <p>{t(DictionaryProps.Email)}</p>
                <input
                  className={CSSProps.Login.El}
                  type={Constants.Types.Email}
                  onChange={(e) => setUserName(e.target.value)}
                  required={true}
                />
              </div>
            </label>
            <label className={CSSProps.Login.Loginlabel}>
              <p>{t(DictionaryProps.Password)}</p>
              <input
                className={CSSProps.Login.El}
                type={Constants.Types.Password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </label>
            <label
              className={CSSProps.Login.Loginlabel}
              onClick={() => {
                setShowAddUser(CSSProps.Login.ShowAddUser);
                setShowLoginUser(CSSProps.Login.HideLoginUser);
                setShrinkPage(CSSProps.Empty);
              }}
            >
              <p>
                {IsOrder
                  ? t(DictionaryProps.ContinueAsGeust)
                  : t(DictionaryProps.Register)}
              </p>
            </label>
            <div className={CSSProps.Login.LoginbuttonArea}>
              <button
                className={CSSProps.Login.Loginbutton}
                type={Constants.Types.Submit}
              >
                {IsOrder ? t(DictionaryProps.Pay) : t(DictionaryProps.Login)}
              </button>
            </div>
          </form>
        </div>
        <div className={CSSProps.Login.AddUserBody + showAddUser}>
          <h1>
            {IsOrder
              ? t(DictionaryProps.EnterInfo)
              : t(DictionaryProps.PleaseRegister)}
          </h1>
          <form
            onSubmit={(event) => {
              handleNewUser(event);
            }}
          >
            {RegisterModel.map((prop) => {
              return (
                <label key={prop.id} className={CSSProps.Login.Loginlabel}>
                  <p>{t(prop.languageKey)}</p>
                  <input
                    className={CSSProps.Login.El}
                    id={prop.id}
                    type={prop.type}
                    onChange={(e) => {
                      validateInput(e.target.value, prop);
                    }}
                    onBlur={(e) => {
                      validateOnLeave(e.target.value, prop);
                    }}
                    autoComplete={prop.autoComplete}
                    required={prop.required}
                  />
                  {errors
                    .filter((error) => error.key.includes(prop.id))
                    .map((e) => e.value)}
                </label>
              );
            })}
            <div className={CSSProps.Login.LoginbuttonArea}>
              <button
                className={CSSProps.Login.Loginbutton}
                type={Constants.Types.Submit}
                value={Constants.Types.Submit}
              >
                {IsOrder
                  ? t(DictionaryProps.Pay)
                  : t(DictionaryProps.Register)}
              </button>
              <button
                className={CSSProps.Login.Loginbutton}
                onClick={() => {
                  setShowAddUser(CSSProps.Empty);
                  setShowLoginUser(CSSProps.Empty);
                  setShrinkPage(CSSProps.Login.ShrinkPage);
                }}
              >
                {t(DictionaryProps.Cancel)}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    if(IsOrder)
    return <div>Hi, {t(DictionaryProps.OrderAs)} {token.email}<button className={CSSProps.Login.Loginbutton} onClick={()=>order(null)}>{t(DictionaryProps.Pay)}</button></div>;
    else
    
    setTimeout(()=>{
      history.push("/");
    },1000);

    return <div></div>
  }
};

export default Login;
