import { Button } from "antd";
import { useNotification } from "../../notification/hooks/use-notification";
type AddPortButtonType = {
  setAllowPorts: (ports: any[]) => void;
};

const AddPortButton = ({ setAllowPorts }: AddPortButtonType) => {
  const noti = useNotification();

  const onClick = async () => {
    if ("serial" in navigator) {
      await (navigator.serial as any).requestPort();
      const ports = await (navigator.serial as any).getPorts();
      setAllowPorts(ports);
    } else {
      noti?.error({
        message: "Không hỗ trợ",
        description: "Trình duyệt của bạn không hỗ trợ kết nối cổng USB",
      });
    }
  };
  return (
    <Button onClick={onClick} type="primary">
      Thêm cổng
    </Button>
  );
};

export default AddPortButton;
