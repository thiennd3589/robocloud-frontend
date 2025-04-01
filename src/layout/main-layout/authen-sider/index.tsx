import { useSelector } from "react-redux";
import { useGetConversationQuery } from "../../../services/conversation";
import ConversationItem from "./conversation-item";
import styles from "./styles.module.scss";
import { RootState } from "../../../redux/store";
import { useEffect, useRef } from "react";

const AuthenSider = () => {
  const logs = useSelector((state: RootState) => state.logging.logs);
  const { data } = useGetConversationQuery(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [logs]);

  return (
    <div className="flex flex-col px-[5px] justify-between flex-1 pb-[5px]">
      <div className="flex flex-col">
        <h2 className="font-medium text-[18px] mt-5 mb-2">
          Lịch sử trò chuyện
        </h2>
        {data?.map((conv, index) => (
          <ConversationItem key={conv.id} {...{ ...conv, index }} />
        ))}
      </div>
      {/* <div className={styles.monitor}></div> */}
      <div className={styles["monitor-frame"]}>
        <div className={styles["monitor-screen"]}>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <p key={index} className={styles[log.type]}>
                {log.text}
              </p>
            ))
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center !text-xl">
                Xin chào
                <br />
                <span className="capitalize">{currentUser.fullName}</span>
              </p>
            </div>
          )}
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
};

export default AuthenSider;
