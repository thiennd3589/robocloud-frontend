import { lazy, useState } from "react";
import SignInButton from "./sign-in-button";
import styles from "./styles.module.scss";

const LoginSignUpModal = lazy(() => import("./login-signup-modal"));

const NotAuthenSider = () => {
  const [showModal, setShowModal] = useState(false);
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
