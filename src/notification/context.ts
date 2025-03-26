import { NotificationInstance } from "antd/es/notification/interface";
import React from "react";

type NotificationContextValue = {
  notification?: NotificationInstance;
};

const NotificationContext = React.createContext<NotificationContextValue>({});

export default NotificationContext;
