import { Button } from "antd";
import { doRequest } from "../../http-client/request";
import { useNotification } from "../../notification/hooks/use-notification";
import { useContext, useState } from "react";
import { USBPortContext } from "../../usb-port/context";

const ImportCodeBtn = ({
  messageId,
  className,
}: {
  messageId: string;
  className?: string;
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
      const hexLines = hexString.trim().split("\n");

      await port.open({ baudRate: 115200 });
      const writer = port.writable.getWriter();

      console.log("====START=====");
      const fullHexData = hexLines.join("\r\n");
      await writer.write(new TextEncoder().encode(fullHexData));
      console.log("========END======");
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
    >
      Nạp code
    </Button>
  );
};

export default ImportCodeBtn;
