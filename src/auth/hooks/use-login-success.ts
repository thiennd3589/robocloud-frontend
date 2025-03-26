import { useAuth } from "./use-auth";
import Cookies from "js-cookie";
export const useLoginSuccess = () => {
  const { setAuthenticated, setCurrentUser } = useAuth();

  return (accessToken: string, currentUser: any) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("currentUser", JSON.stringify(currentUser));
    setAuthenticated(true);
    setCurrentUser(currentUser);
  };
};
