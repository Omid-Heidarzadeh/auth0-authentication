import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
  const { login, isAuthenticated } = props.auth;

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
