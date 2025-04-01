import { lazy, useEffect, useState } from "react";
import SignInButton from "./sign-in-button";
import styles from "./styles.module.scss";
import { useIsAuthenticated } from "../../../auth/hooks/use-is-authenticated";

const LoginSignUpModal = lazy(() => import("./login-signup-modal"));

const NotAuthenSider = () => {
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) setShowModal(true);
  }, [isAuthenticated]);

  return (
    <>
      <div className={styles["not-authen-sider"]}>
        <SignInButton onClick={() => setShowModal(true)} />
      </div>
      <LoginSignUpModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default NotAuthenSider;
