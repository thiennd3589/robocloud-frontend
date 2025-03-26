import { ERROR_MESSAGE } from "./error-message";
import { useNotification } from "./use-notification";

export const useNotificationError = () => {
  const notification = useNotification();

  return (messageCode = "") => {
    const message = ERROR_MESSAGE[messageCode] ?? "Đã có lỗi xảy ra";
    notification?.error({
      message,
    });
  };
};
