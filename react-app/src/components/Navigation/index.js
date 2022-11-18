// frontend/src/components/Navigation/index.js
import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import cb from './Images/cb.png'
// import cb2 from './Images/cb2.png'
import codebunny from './Images/codebunny.png'



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const allCoders = useSelector(state => Object.values(state.coders))

  if(!allCoders) return null



  let sessionLinks;
  if (sessionUser) {
    const sessionUserId = sessionUser.id
    let userCoder = allCoders.filter(coder => coder.user_id === sessionUserId )



    sessionLinks = (
      <>
       <div className= "Create-a-spot-Button">
        <NavLink to="/coder/new">
        {sessionUser && userCoder.length === 0 ? <button className= "become-host-button">Become a Coder</button>: null}
      </NavLink>
      </div>
      <div className= "profile-button">
      <ProfileButton user={sessionUser}/>
      </div>
      </>

    );
  } else {
    sessionLinks = (
      <>
      <div className= "logged-out-profile-container">
      <div className= "profile-button">
      <ProfileButton/>
      </div>
      </div>
      </>
    );
  }

  return (
    <div className="navbar-main">
      <div className="navbar-inner-container">
    <div className= "Home-Container">
        <NavLink exact to="/"><img className='logo' src={codebunny} alt="logo here"/></NavLink>
    </div>

    <div className="Right-Side-Container">
      {isLoaded && sessionLinks}
    </div>
    </div>
    </div>

  );
}

export default Navigation;
