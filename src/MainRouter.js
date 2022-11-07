import React, { useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import AccessDenied from './AccessDenied';
import App from './App';
import Callback from './Callback';
import { AuthContext } from './context/AuthContext';
import Courses from './Courses';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Private from './Private';
import Profile from './Profile';
import Public from './Public';
import Login from './Login';

function MainRouter() {
  const auth = useContext(AuthContext);

  function secureLoader(scopes) {
    scopes = scopes || [];

    return function () {
      if (!auth.isAuthenticated) {
        return redirect(`/login?lastPage=${window.location.pathname}`);
      }

      if (scopes.length > 0 && !auth.userHasScopes(scopes))
        return redirect(`/access-denied/?scopes=${scopes.join(',')}`);
    };
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'callback', element: <Callback /> },
        { path: 'profile', loader: secureLoader(), element: <Profile /> },
        { path: 'private', loader: secureLoader(), element: <Private /> },
        {
          path: 'courses',
          loader: secureLoader(['read:courses']),
          element: <Courses />,
        },
        { path: 'public', element: <Public /> },
        { path: 'login', element: <Login /> },
        { path: 'access-denied', element: <AccessDenied /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default MainRouter;
