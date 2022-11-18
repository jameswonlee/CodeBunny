// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';

import Reviews from './components/Reviews'

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import CreateCoderForm from "./components/CreateCoderForm"
import CreateProjectForm from "./components/CreateProjectForm"
import CreateReviewForm from "./components/CreateReviewForm"
import UpdateCoderForm from "./components/UpdateCoderForm"
import * as sessionActions from "./store/session";
import CoderInfo from './components/CoderInfo';
import SelectCoderForProject from './components/SelectCoderForProject';
import NewProjectConfirmation from './components/NewProjectConfirmation';
import UserProjects from './components/UserProjects';
import EditProjectForm from './components/EditProjectForm';
import DeleteProjectForm from './components/DeleteProjectForm';
import NotFound from './components/NotFound';
import CoderJobs from './components/CoderJobs';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    })();
  }, [dispatch]);

  return (
    // <BrowserRouter>
    <>
      {/* <NavBar /> */}
      <Navigation isLoaded={isLoaded} />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <Route path='/createProject' exact={true} >
          <CreateProjectForm/>
        </Route> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          {/* this is to see User Profile */}
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path="/coder/new">
          <CreateCoderForm />
        </Route>
        <Route path="/review/:coderId/new">
          <CreateReviewForm />
        </Route>
        <Route path='/listofusers' exact={true} >
          <UsersList />
        </Route>
        <Route path='/coders/:coderId'>
          <CoderInfo />
        </Route>
        <Route path='/reviews'>
          <Reviews />
        </Route>
        <Route path="/project/new">
          <CreateProjectForm />
        </Route>
        <Route path="/projects/new/:projectId">
          <SelectCoderForProject />
        </Route>
        < Route path="/current/user/projects" >
          <UserProjects />
        </Route>
        <Route path="/projects/:projectId/edit">
          <EditProjectForm />
        </Route>
        < Route path="/projects/:projectId/delete" >
          <DeleteProjectForm />
        </Route>
        <Route path='/coder/:coderId/edit'>
          <UpdateCoderForm />
        </Route>
        <Route path="/projects/confirmation/:projectId">
          <NewProjectConfirmation />
        </Route>
        <Route path="/current/user/jobs">
          <CoderJobs />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <footer className="footer">
          <div className="footer-about">
            <strong>CodeBunny, inspired by TaskRabbit: [ Keerthana, Ashwin, Jason, James ]</strong>
          </div>
          <div className="footer-links">
            <a id="github" className="links-github" href="https://github.com/jameswonlee/CodeBunny">
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
          </div>
      </footer>
    </>
    // </BrowserRouter>
  );
}

export default App;
