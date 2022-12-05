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
          <strong>CodeBunny -  Inspired by TaskRabbit</strong>
        </div>
        <div className="footer-links">
          <div>
            <a id="github" className="links-github" href="https://github.com/Keerthana-Yellapragada">Keerthana &nbsp; 
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
            <a id="linkedin" className="links-linkedin" href="https://www.linkedin.com/in/keerthana-yellapragada/">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
          <div>
            <a id="github" className="links-github" href="https://github.com/ashramki96">Ashwin &nbsp;
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
            <a id="linkedin" className="links-linkedin" href="https://www.linkedin.com/in/ashwin-ramakrishnan-4910b9b1/">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
          <div>
            <a id="github" className="links-github" href="https://github.com/jrkong216">Jason &nbsp;
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
            <a id="linkedin" className="links-linkedin" href="https://www.linkedin.com/in/jason-kong-39552922/">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
          <div>
            <a id="github" className="links-github" href="https://github.com/jameswonlee">James &nbsp;
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
            <a id="linkedin" className="links-linkedin" href="https://www.linkedin.com/in/jameswonlee/">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
    // </BrowserRouter>
  );
}

export default App;