import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { AuthContextProvider, AuthContext } from './context/AuthContext';

function App(props) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  auth.setNavigate(navigate);

  return (
    <AuthContextProvider>
      <div className="App">
        <Nav />
        <div className="body">
          <Outlet />
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
