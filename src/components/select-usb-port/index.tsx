import { Select } from "antd";
import { useContext, useEffect, useState } from "react";
import NotFoundPort from "./not-found-port";
import AddPortButton from "./select-button";
import { USBPortContext } from "../../usb-port/context";

const SelectUsbPort = () => {
  const [allowPorts, setAllowPorts] = useState<any[]>([]);
  const { setPort } = useContext(USBPortContext);
  useEffect(() => {
    if ("serial" in navigator) {
      (navigator.serial as any)
        .getPorts()
        .then((ports: any[]) => setAllowPorts(ports));
    }
  }, []);

  return (
    <div className="flex gap-1.5">
      {allowPorts.length > 0 && (
        <Select
          style={{ width: 200 }}
          notFoundContent={<NotFoundPort />}
          options={allowPorts.map((port, index) => ({
            value: index,
            label: (
              <div
                className="flex justify-between"
                onClick={() => setPort(port)}
              >
                <span>{port.getInfo()?.usbProductId || `Cổng ${index}`}</span>
              </div>
            ),
          }))}
          placeholder="Chọn cổng USB"
        />
      )}
      <AddPortButton setAllowPorts={setAllowPorts} />
    </div>
  );
};

export default SelectUsbPort;
