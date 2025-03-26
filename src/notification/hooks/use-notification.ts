import { useContext } from "react";
import NotificationContext from "../context";

export const useNotification = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};
