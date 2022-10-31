import React from 'react';
import Auth from '../Auth/Auth';

export const auth = new Auth();
export const AuthContext = React.createContext(auth);
