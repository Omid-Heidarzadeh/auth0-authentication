import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';

export const AuthContext = React.createContext();
let _auth = new Auth();

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  _auth = new Auth(navigate);

  return <AuthContext.Provider value={_auth}>{children}</AuthContext.Provider>;
}

export const auth = _auth;
