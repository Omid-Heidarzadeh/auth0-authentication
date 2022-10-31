import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Home(props) {
  const auth = useContext(AuthContext);
  const { login, isAuthenticated } = auth;

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated ? (
        <Link to={'/profile'}>View Profile</Link>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default Home;
