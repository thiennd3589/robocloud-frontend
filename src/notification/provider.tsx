import { PropsWithChildren } from "react";
import NotificationContext from "./context";
import { notification } from "antd";

const NotificationProvider = (props: PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider
      value={{
        notification: api,
      }}
    >
      {props.children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
