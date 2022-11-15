// frontend/src/components/SignupFormPage/SignupForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import{useHistory} from 'react-router-dom'
import "./SignupForm.css"

function SignupForm() {
  const dispatch = useDispatch();
  const history  = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (password === confirmPassword){
      setErrors([]);
      return dispatch(sessionActions.signup({ first_name, last_name, email, username, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field'])
    }


  };

  if (sessionUser){
    console.log("session user create", sessionUser)
    history.push("/")
  }


  return (

    <div className="outer-sign-container">
        <div className="inner-sign-container">
    <form onSubmit={handleSubmit}>
      <div className="form-sign-container">
        <div className="title-sign-container">
        <h2>Please Sign Up</h2>
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
        className="form-sign-inputs"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </label>
      <label>
        Username
        <input
        className="form-sign-inputs"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
      </label>
      <label>
        FirstName
        <input
        className="form-sign-inputs"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="FirstName"
        />
      </label>
      <label>
        LastName
        <input
        className="form-sign-inputs"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="LastName"
        />
      </label>
      <label>
        Password
        <input
        className="form-sign-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      <label>
        Confirm Password
        <input
        className="form-sign-inputs"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
        />
      </label>
      </div>
      <div className="button-sign-container">
      <button className="Sign-Up-button" type="submit">Sign Up</button>
      </div>
      </div>
      </form>
      </div>
    </div>

  );
}
export default SignupForm;
