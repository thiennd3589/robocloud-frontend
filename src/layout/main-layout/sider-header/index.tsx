import { FormOutlined, PicLeftOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useContext } from "react";
import LayoutContext from "../context";
import ConversationContext from "../../../conversation/context";

const SiderHeader = () => {
  const { setCollapsed } = useContext(LayoutContext);
  const { setSelectedConversation } = useContext(ConversationContext);
  return (
    <div className={styles["sider-header"]}>
      <div className={styles["icon"]} onClick={() => setCollapsed(false)}>
        <PicLeftOutlined />
      </div>
      <div
        className={styles["icon"]}
        onClick={() => setSelectedConversation({})}
      >
        <FormOutlined />
      </div>
    </div>
  );
};

export default SiderHeader;
