import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setAccessToken, setCurrentUser } from "../../redux/redux-auth";
export const useLoginSuccess = () => {
  const dispatch = useDispatch();
  return (accessToken: string, currentUser: any) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("currentUser", JSON.stringify(currentUser));
    dispatch(setAccessToken(accessToken));
    dispatch(setCurrentUser(currentUser));
  };
};
