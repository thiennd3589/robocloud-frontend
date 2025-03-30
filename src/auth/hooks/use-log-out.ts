import { useDispatch } from "react-redux";
import { removeAuth } from "../../redux/redux-auth";
import Cookies from "js-cookie";
export const useLogOut = () => {
  const dispatch = useDispatch();
  return () => {
    Cookies.remove("accessToken");
    Cookies.remove("currentUser");
    dispatch(removeAuth());
  };
};
