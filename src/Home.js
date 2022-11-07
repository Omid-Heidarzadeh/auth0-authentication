import React, { useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Home() {
  const { tokensRenewed } = useOutletContext();
  const auth = useContext(AuthContext);
  const { login, isAuthenticated } = auth;

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated || tokensRenewed ? (
        <Link to={'/profile'}>View Profile</Link>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default Home;
