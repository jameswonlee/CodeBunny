// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import Reviews from './components/Reviews'

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import CreateCoderForm from "./components/CreateCoderForm"
import CreateProjectForm from "./components/CreateProjectForm"
import UpdateCoderForm from "./components/UpdateCoderForm"
import * as sessionActions from "./store/session";
import CoderInfo from './components/CoderInfo';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    })();
  }, [dispatch]);

  return (
    // <BrowserRouter>
    <>
      {/* <NavBar /> */}
      <Navigation isLoaded={isLoaded}/>
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <ProtectedRoute path='/createProject' exact={true} >
          {/* this is to create a project */}
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          {/* this is to see User Profile */}
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
        <Route path="/coder/new">
            <CreateCoderForm/>
          </Route>
        <Route path='/listofusers' exact={true} >
          <UsersList/>
        </Route>
        <Route path='/coders/:coderId'>
          <CoderInfo />
        </Route>
        <Route path='/reviews'>
          <Reviews />
        </Route>
        <Route path="/project/new">
            <CreateProjectForm/>
          </Route>
          <Route path='/coder/:coderId/edit'>
            <UpdateCoderForm/>
          </Route>
      </Switch>
      </>
    // </BrowserRouter>
  );
}

export default App;
