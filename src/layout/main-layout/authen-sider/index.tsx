import { useSelector } from "react-redux";
import { useGetConversationQuery } from "../../../services/conversation";
import ConversationItem from "./conversation-item";
import styles from "./styles.module.scss";
import { RootState } from "../../../redux/store";
import { useEffect, useRef } from "react";
import DisplayGif from "./display-gif";
import classNames from "classnames";

const AuthenSider = () => {
  const logs = useSelector((state: RootState) => state.logging.logs);
  const { data } = useGetConversationQuery(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [logs]);

  if (!data) return null;

  return (
    <div className="flex flex-col px-[5px] justify-between flex-1 pb-[5px] max-h-[100%] gap-2">
      <div
        className={classNames(
          "flex flex-col flex-2 max-h-[45%] overflow-scroll",
          styles["conversation-list"]
        )}
      >
        <h2 className="font-medium text-[18px] mt-5 mb-2">
          Lịch sử trò chuyện
        </h2>
        {data?.map((conv, index) => (
          <ConversationItem key={index} {...{ ...conv, index }} />
        ))}
      </div>
      <div className="flex flex-col gap-3 justify-end fixed bottom-1.5 max-w-[290px]">
        <DisplayGif />
        <div className={styles["monitor-frame"]}>
          <div className={styles["monitor-screen"]}>
            <p className={styles[logs.type]}>{logs.text}</p>
            <div ref={ref}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenSider;
