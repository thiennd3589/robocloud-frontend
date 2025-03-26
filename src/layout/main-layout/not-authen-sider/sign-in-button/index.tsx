import { Button, ButtonProps } from "antd";
import styles from "./styles.module.scss";

const SignInButton = (props: ButtonProps) => {
  return (
    <Button {...{ ...props, className: styles["signin-button"] }}>
      Đăng nhập
    </Button>
  );
};

export default SignInButton;
