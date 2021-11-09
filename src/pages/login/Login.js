import React, { useEffect, useState } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import PropTypes from 'prop-types';
import "./Login.css";

async function loginUser(credentials) {
 
  return fetch('http://localhost:8080/users/findbyemail/' + credentials.username, {
    
    method: 'GET',
    headers: new Headers({
      'Authorization' : 'Basic ' + Buffer.from(credentials.username+":"+credentials.password).toString('base64'),
      'Content-Type' : 'application/json; charset=utf-8',
      'h_a_i' : '423bfd83-f74d-47bf-ad29-090500d33743'
})
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Login);
  });

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    alert(token[0].name);
    //setToken(token);
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
};