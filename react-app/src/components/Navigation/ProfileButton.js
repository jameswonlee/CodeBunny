// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal'
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import SignupForm from '../SignupFormModal/SignupForm'
import LoginForm from '../LoginFormModal/LoginForm'


import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);



  

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const allCoders = useSelector(state => Object.values(state.coders))

  if (!allCoders) {
    return null
  }

  let currCoder = allCoders.filter(coder => coder.user_id === user?.id)[0]
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  const logout = (e) => {
    e.preventDefault();
    // console.log("made it to profilebutton logout handler")
    dispatch(sessionActions.logout())
    history.push("/");
  };

  const myCoder = (e) => {
    e.preventDefault();
    if (user.id === currCoder.user_id) {
      history.push(`/coders/${currCoder.id}`)
    } else {
      history.push("/coder/new")
    }


  };
  const myProjects = (e) => {
    e.preventDefault();
    history.push(`/current/user/projects`);
  };

  const myJobs = (e) => {
    e.preventDefault();
    history.push(`/current/user/jobs`);
  };

  const createProject = (e) => {
    e.preventDefault();
    history.push('/project/new');
  };

  let loggedInOrNot;
  if (user) {
    loggedInOrNot = (
      <>
        <button className="actual-button" onClick={openMenu}>
          <div className="profile-button-container" id="pink">
            <span className="fa-solid fa-bars fa-2x" id="pink"></span>
            <span className="fa-solid fa-circle-user fa-2x" id="pink"></span>
          </div>
        </button>
        {showMenu && (
          <div className="dropdown-content">
            <div>
              {currCoder
                ?

                (<div className="my-spots" onClick={myCoder}>My Coder Profile</div>)

                :
                null
              }
            </div>
            <div>
              <div className="my-reviews" onClick={myProjects}>My Projects</div>
            </div>
            <div>
              <div className="my-reviews" onClick={myJobs}>My Jobs</div>
            </div>
            <div>
              <div className="my-reviews" onClick={createProject}>Start a Project</div>
            </div>
            <div>
              <div className="log-out" onClick={logout}>Log Out</div>
            </div>
          </div>
        )}
      </>
    )
  } else {
    loggedInOrNot = (
      <>
        <button className="actual-button" onClick={openMenu}>
          <div className="profile-button-container" id="pink">
            <span className="fa-solid fa-bars fa-2x"></span>
            <span className="fa-solid fa-circle-user fa-2x"></span>
          </div>
        </button>
        {showMenu && (
          <div className="dropdown-content">
            <div className="sign-up-text" style={{ zIndex: 3 }} onClick={() => setShowSignUpModal(true)}>Sign Up</div>
            <div className="log-in-text" style={{ zIndex: 3 }} onClick={() => setShowLogInModal(true)}>Log In</div>
          </div>
        )}
        {showSignUpModal && (
          <Modal onClose={() => setShowSignUpModal(false)}>
            <SignupForm />

          </Modal>
        )}
        {showLogInModal && (
          <Modal onClose={() => setShowLogInModal(false)}>

            <LoginForm />
          </Modal>
        )}

      </>
    )
  }

  return (
    <>
      {loggedInOrNot}
    </>
  );
}

export default ProfileButton;
