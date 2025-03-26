import { useState } from "react";
import RegisterPopup from "./register";
import LoginPopup from "./login";

type LoginSignUpModalProps = {
  visible?: boolean;
  onClose: () => void;
};

const LoginSignUpModal = ({ visible, onClose }: LoginSignUpModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginPopup
      {...{ visible, onClose, onSwitchToRegister: () => setIsLogin(false) }}
    />
  ) : (
    <RegisterPopup
      {...{ visible, onClose, onSwitchToLogin: () => setIsLogin(true) }}
    />
  );
};

export default LoginSignUpModal;
