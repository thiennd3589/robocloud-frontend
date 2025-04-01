import { Button } from "antd";
import { doRequest } from "../../http-client/request";
import { useNotification } from "../../notification/hooks/use-notification";
import { useContext, useState } from "react";
import { USBPortContext } from "../../usb-port/context";
import { uploadCode } from "../../lib/import-code";
const ImportCodeBtn = ({
  messageId,
  className,
  disabled,
}: {
  messageId: string;
  className?: string;
  disabled?: boolean;
}) => {
  const { port } = useContext(USBPortContext);
  const [loading, setLoading] = useState(false);
  //115200
  const noti = useNotification();

  const onClick = async () => {
    try {
      setLoading(true);
      const res = await doRequest({
        url: `/import-code/${messageId}`,
        authen: true,
      });

      if (!port) {
        noti?.error({ message: "Chưa có cổng USB nào được chọn." });
        return;
      }

      const data = res?.data;
      const { hex: hexString } = data;
      // const hexLines = hexString.trim().split("\n");
      await uploadCode(
        port,
        hexString,
        () => noti?.success({ message: "Nạp code thành công!" }),
        () => noti?.error({ message: "Nạp code thất bại!" })
      );
    } catch (_error) {
      console.log(_error);
      noti?.error({ message: "Đã có lỗi xảy ra." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      className={className}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {!disabled ? "Nạp code" : "Code chưa được compile"}
    </Button>
  );
};

export default ImportCodeBtn;
