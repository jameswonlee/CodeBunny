// frontend/src/components/Navigation/index.js
import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import airbnb2 from './Images/airbnb2.png'



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
       <div className= "Create-a-spot-Button">
        <NavLink to="/spots/new">
      <button className= "become-host-button">Become a Host</button>
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
        <NavLink exact to="/"><img className='logo' src={airbnb2}/></NavLink>
    </div>

    <div className="Right-Side-Container">
      {isLoaded && sessionLinks}
    </div>
    </div>
    </div>

  );
}

export default Navigation;
