import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function Callback(props) {
  const location = useLocation();
  const isAuthHandled = useRef(false);

  useEffect(() => {
    if (isAuthHandled.current) return;

    if (/access_token|id_token|error/.test(location.hash)) {
      props.auth.handleAuthentication();
      isAuthHandled.current = true;
    } else {
      throw new Error('Invalid callback URL.');
    }
  }, [location.hash, props.auth]);

  return <div>Loading...</div>;
}

export default Callback;
