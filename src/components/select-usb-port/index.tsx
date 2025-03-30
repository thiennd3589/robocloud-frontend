import { Select } from "antd";
import { useEffect, useState } from "react";
import NotFoundPort from "./not-found-port";
import AddPortButton from "./select-button";

const SelectUsbPort = () => {
  const [allowPorts, setAllowPorts] = useState<any[]>([]);

  useEffect(() => {
    if ("serial" in navigator) {
      (navigator.serial as any)
        .getPorts()
        .then((ports: any[]) => setAllowPorts(ports));
    }
  }, []);

  return (
    <div className="flex gap-1.5">
      {allowPorts.length && (
        <Select
          style={{ width: 200 }}
          notFoundContent={<NotFoundPort />}
          options={allowPorts.map((port, index) => ({
            value: index,
            label: (
              <div className="flex justify-between">
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
