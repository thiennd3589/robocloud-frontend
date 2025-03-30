import { useContext } from "react";
import ConversationContext from "../../../../conversation/context";
import styles from "./styles.module.scss";
import LayoutContext from "../../../../layout/main-layout/context";
import { PicLeftOutlined } from "@ant-design/icons";
import UserAvatar from "../../../../components/user-avatar";
import { useIsAuthenticated } from "../../../../auth/hooks/use-is-authenticated";
import SelectUsbPort from "../../../../components/select-usb-port";
import logo from "../../../../assets/logo-white.png";

const FrameHeader = () => {
  const { collapsed, setCollapsed } = useContext(LayoutContext);
  const { selectedConversation } = useContext(ConversationContext);
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className={styles["frame-header"]}>
      <div className={styles["action"]}>
        {collapsed && (
          <div
            className={styles["toggle-icon"]}
            onClick={() => setCollapsed(true)}
          >
            <PicLeftOutlined />
          </div>
        )}
        <div className="w-18 h-18">
          <img src={logo} className="w-full h-full" />
        </div>
        <h1>{selectedConversation?.title ?? "Đoạn chat mới"}</h1>
      </div>
      <div className={styles["action"]}>
        <SelectUsbPort />
        {isAuthenticated && <UserAvatar />}
      </div>
    </div>
  );
};

export default FrameHeader;
