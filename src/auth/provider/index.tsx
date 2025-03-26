import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext from "../context";
import Cookies from "js-cookie";
const AuthProvider = (props: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const currentUser = Cookies.get("currentUser");

    if (accessToken && currentUser) {
      setAuthenticated(true);
      setCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setCurrentUser,
        setAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
