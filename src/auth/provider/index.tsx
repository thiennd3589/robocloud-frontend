import { PropsWithChildren } from "react";

const AuthProvider = (props: PropsWithChildren) => {
  // useEffect(() => {}, []);

  return props.children;
};

export default AuthProvider;
