import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Login(props) {
  const auth = useContext(AuthContext);
  const [params] = useSearchParams();
  const lastPage = params.get('lastPage');

  useEffect(() => {
    auth.login(lastPage);
  });

  return <div>You need to login first. Redirecting to login page...</div>;
}

export default Login;
