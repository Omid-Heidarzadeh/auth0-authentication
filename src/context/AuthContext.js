import React from 'react';
import Auth from '../Auth/Auth';

const _auth = new Auth();
export const AuthContext = React.createContext(_auth);

export function AuthContextProvider({ children }) {
  return <AuthContext.Provider value={_auth}>{children}</AuthContext.Provider>;
}
