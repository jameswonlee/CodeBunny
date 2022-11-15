import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./DemoUser.css"

function DemoUser(){
    const dispatch = useDispatch();

    const handleDemoUser = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login(
            { email: 'demo@aa.io',
              password: "password" }))
    }
    return(
        <button className="Demo-Button" onClick={handleDemoUser}>Log in as a Demo User</button>
    )
}















export default DemoUser
