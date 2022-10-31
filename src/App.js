import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Callback from './Callback';
import Nav from './Nav';
import Home from './Home';
import Profile from './Profile';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';
import PageNotFound from './PageNotFound';
import RedirectToLogin from './RedirectToLogin';
import { AuthContext } from './context/AuthContext';

function App(props) {
  const auth = useContext(AuthContext);
  const { isAuthenticated, userHasScopes } = auth;
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
                element={isAuthenticated ? <Profile /> : <RedirectToLogin />}
              />
            }
            {
              <Route
                path="private"
                element={isAuthenticated ? <Private /> : <RedirectToLogin />}
              />
            }
            {
              <Route
                path="courses"
                element={
                  isAuthenticated && userHasScopes(['read:courses']) ? (
                    <Courses />
                  ) : (
                    <RedirectToLogin />
                  )
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
