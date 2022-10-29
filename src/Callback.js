import React, { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Callback(props) {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const isAuthHandled = useRef(false);

  useEffect(() => {
    if (isAuthHandled.current) return;

    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
      isAuthHandled.current = true;
    } else {
      throw new Error('Invalid callback URL.');
    }
  }, [location.hash, auth]);

  return <div>Loading...</div>;
}

export default Callback;
