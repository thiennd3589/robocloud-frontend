import { AlignLeftOutlined } from "@ant-design/icons";
import { Conversation } from "../../../../types/conversation";
import styles from "./styles.module.scss";
import { useContext } from "react";
import ConversationContext from "../../../../conversation/context";
import classNames from "classnames";

const ConversationItem = (props: Conversation) => {
  const { setSelectedConversation, selectedConversation } =
    useContext(ConversationContext);

  return (
    <div
      className={classNames(styles["conversation-item"], {
        [styles["active"]]: selectedConversation.id === props.id,
      })}
      onClick={() => {
        setSelectedConversation(props);
      }}
    >
      <AlignLeftOutlined />
      <span className="line-clamp-1">{props.title}</span>
    </div>
  );
};

export default ConversationItem;
