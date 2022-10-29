import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Callback from './Callback';
import Nav from './Nav';
import Home from './Home';
import Profile from './Profile';
import PageNotFound from './PageNotFound';
import Public from './Public';
import RedirectToLogin from './RedirectToLogin';
import Private from './Private';
import { AuthContext } from './context/AuthContext';

function App(props) {
  const auth = useContext(AuthContext);
  return (
    <div className="App">
      <Nav />
      <div className="body">
        {
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="callback" element={<Callback />} />
            {
              <Route
                path="profile"
                element={
                  auth.isAuthenticated ? <Profile /> : <RedirectToLogin />
                }
              />
            }
            {
              <Route
                path="private"
                element={
                  auth.isAuthenticated ? <Private /> : <RedirectToLogin />
                }
              />
            }
            <Route path="public" element={<Public />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        }
      </div>
    </div>
  );
}

export default App;
