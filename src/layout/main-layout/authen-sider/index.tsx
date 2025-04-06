import { useSelector } from "react-redux";
import { useGetConversationQuery } from "../../../services/conversation";
import ConversationItem from "./conversation-item";
import styles from "./styles.module.scss";
import { RootState } from "../../../redux/store";
import { useContext, useEffect, useRef } from "react";
import DisplayGif from "./display-gif";
import classNames from "classnames";
import LayoutContext from "../context";

const AuthenSider = () => {
  const { collapsed } = useContext(LayoutContext);
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
          "flex flex-col flex-2 overflow-scroll",
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
      {!collapsed && (
        <div className="flex flex-col gap-3 justify-end fixed bottom-1.5 w-[290px]">
          <div className={styles["monitor-frame"]}>
            <div className={styles["monitor-screen"]}>
              {logs.map((log, index) => (
                <p key={index} className={styles[log.type]}>
                  {log.text}
                </p>
              ))}
              <div ref={ref}></div>
            </div>
          </div>
          <DisplayGif />
        </div>
      )}
    </div>
  );
};

export default AuthenSider;
