import React, { useState } from "react";

import "../css/login.css"


import userIcon from "../img/user.png"
import padlockIcon from "../img/padlock.png"


const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/');
  }

  return (
    <div className="loginForm">
        <div className="loginUsername">
          <img src={userIcon} className="loginIcon"></img>
          <label htmlFor="user" className="loginLabel">Username</label>
        </div>
        <input
            type="text"
            className="formInput"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />

        <div className="loginUsername">
          <img src={padlockIcon} className="loginIcon"></img>
          <label htmlFor="id" className="loginLabel">ID</label>
        </div>
        <input
            type="text"
            className="formInput"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />

        <button onClick={login} className="loginBtn">
          LOGIN
        </button>
    </div>
  );
};

export default Login;