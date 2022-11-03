import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import { AuthContextProvider } from './context/AuthContext';

function App(props) {
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
