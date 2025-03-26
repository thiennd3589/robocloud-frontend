import React from "react";

type AuthContextValue = {
  isAuthenticated?: boolean;
  currentUser?: any;
  setAuthenticated: (value: boolean) => void;
  setCurrentUser: (currentUser: any) => void;
};

const AuthContext = React.createContext<AuthContextValue>({
  setAuthenticated(_value: boolean) {},
  setCurrentUser(_currentUser) {},
});

export default AuthContext;
