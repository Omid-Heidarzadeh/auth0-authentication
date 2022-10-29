import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  const { isAuthenticated, login, logout } = props.auth;
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to={'/profile'}>Profile</NavLink>
          </li>
        )}
        <li>
          <NavLink to={'/public'}>Public</NavLink>
        </li>
        <li>
          <button
            onClick={() => {
              isAuthenticated ? logout() : login();
            }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
