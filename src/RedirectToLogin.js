import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from './context/AuthContext';

function Login(props) {
  const auth = useContext(AuthContext);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      auth.login();
    }, 50);
    return () => {
      clearTimeout(timer.current);
    };
  });

  return <div>Redirecting to login page</div>;
}

export default Login;
