import "./Login.css";
import React, { useEffect, useState } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import { useHistory } from "react-router";
import { Validator } from "../../tools/Validator";
import { RegisterModel } from "../../data/models/RegisterModel";
import { User } from "../../data/models/User";
import ApiEndpoints from "../../data/constants/ApiEndpoints";
import Constants from "../../data/constants/Constants";
import Path from "../../data/constants/Paths";

async function loginUser(email, password) {
  fetch(ApiEndpoints.Login, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.result);
      Base.prototype.setToken(json.result);
      return json.token;
    })
    .then(() => {
      window.location.reload();
    });
}

async function registerUser(user) {
  fetch(ApiEndpoints.Register, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({ raw: JSON.stringify(user) }),
  }).then((res) => {
    if (res.ok) {
      loginUser(user.email, user.password);
    }
    return null;
  });
}

export default function Login() {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Login);
  });

  const [errors, setErrors] = useState([]);
  const [username, setUserName] = useState();
  const [showAddUser, setShowAddUser] = useState(CSSProps.Empty);
  const [showLoginUser, setShowLoginUser] = useState(CSSProps.Empty);
  const [shrinkPage, setShrinkPage] = useState(CSSProps.Login.ShrinkPage);
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(username, password);
  };

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
              <p key={x.id} className={CSSProps.Login.Errormessage}>
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
    registerUser(User);
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
              <p className={CSSProps.Login.Errormessage}>
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
              <p className={CSSProps.Login.Errormessage}>
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
                <p className={CSSProps.Login.Errormessage}>Invalid email!</p>
              ),
            },
          ]);
      }
    }
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
          <h1>Please Log In</h1>
          <form onSubmit={handleLogin}>
            <label className={CSSProps.Login.Loginlabel}>
              <div>
                <p>Email</p>
                <input
                  className={CSSProps.Login.El}
                  type={Constants.Types.Email}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </label>
            <label className={CSSProps.Login.Loginlabel}>
              <p>Password</p>
              <input
                className={CSSProps.Login.El}
                type={Constants.Types.Password}
                onChange={(e) => setPassword(e.target.value)}
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
              <p>Register</p>
            </label>
            <div className={CSSProps.Login.LoginbuttonArea}>
              <button
                className={CSSProps.Login.Loginbutton}
                type={Constants.Types.Submit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className={CSSProps.Login.AddUserBody + showAddUser}>
          <h1>Please register here</h1>
          <form onSubmit={handleRegister}>
            {RegisterModel.map((prop) => {
              return (
                <label key={prop.id} className={CSSProps.Login.Loginlabel}>
                  <p>{prop.languageKey}</p>
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
                Submit
              </button>
              <button
                className={CSSProps.Login.Loginbutton}
                onClick={() => {
                  setShowAddUser(CSSProps.Empty);
                  setShowLoginUser(CSSProps.Empty);
                  setShrinkPage(CSSProps.Login.ShrinkPage);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      history.push(Path.Home);
    }, 1000);
    return <div>Login</div>;
  }
}
