// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUser from "../DemoUser";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
// console.log("this is password",password)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="Outer-modal-Container">
        <div className="Inner-modal-Container">
    <form onSubmit={handleSubmit}>

      <div className="User-Email-Container">
      <div className="title-log-container">
        <h2>Welcome to CodeBunny</h2>
        </div>
        <div className="errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
        <div className="inner-form-sign-container">
      <label>
        Email
        <input
        className="form-inputs"
          type="text"
          value={email}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Email"
        />
      </label>
      </div>
      <div className="Password-Container">
      <label>
        Password
        <input
        className="form-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      </div>
      </div>
      <div className="Login-Container">
      <button className="Login-Button" type="submit">Log In</button>
      </div>
      <div className="Demo-Container">
      <DemoUser/>
      </div>
    </form>
      </div>
    </div>
  );
}

export default LoginForm;
