import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Nav(props) {
  const auth = useContext(AuthContext);
  const { isAuthenticated, login, logout, userHasScopes } = auth;
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
        {isAuthenticated && (
          <li>
            <NavLink to={'/private'}>Private</NavLink>
          </li>
        )}
        {isAuthenticated && userHasScopes(['read:courses']) && (
          <li>
            <NavLink to={'/courses'}>Courses</NavLink>
          </li>
        )}
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
