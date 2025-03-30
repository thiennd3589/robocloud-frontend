import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useIsAuthenticated = () => {
  const { accessToken, currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  return accessToken && currentUser;
};
