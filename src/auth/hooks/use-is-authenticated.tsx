import { useAuth } from "./use-auth";

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated;
};
