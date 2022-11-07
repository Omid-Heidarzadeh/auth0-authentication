import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { AuthContextProvider, AuthContext } from './context/AuthContext';

function App(props) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  auth.setNavigate(navigate);

  const [tokensRenewed, setTokensRenewed] = useState(false);

  useEffect(() => {
    auth.renewToken((err, sessionInfo) => {
      if (sessionInfo) setTokensRenewed(true);
    });
  });

  return (
    <AuthContextProvider>
      <div className="App">
        <Nav />
        <div className="body">
          <Outlet context={{ tokensRenewed }} />
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
