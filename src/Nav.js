import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Nav(props) {
  const auth = useContext(AuthContext);
  const { isAuthenticated, login, logout } = auth;
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
