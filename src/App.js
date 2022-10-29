import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Auth from './Auth/Auth';
import Callback from './Callback';
import Nav from './Nav';
import Home from './Home';
import Profile from './Profile';
import PageNotFound from './PageNotFound';
import NavigateTo from './NavigateTo';
import Public from './Public';

function App(props) {
  const navigate = useNavigate();
  const [auth] = useState(new Auth(navigate));

  return (
    <div className="App">
      <Nav auth={auth} />
      <div className="body">
        {
          <Routes>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="callback" element={<Callback auth={auth} />} />
            {
              <Route
                path="profile"
                element={
                  auth.isAuthenticated ? (
                    <Profile auth={auth} />
                  ) : (
                    <NavigateTo to="/" />
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

