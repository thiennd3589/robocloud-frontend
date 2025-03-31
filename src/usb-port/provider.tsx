import { PropsWithChildren, useState } from "react";
import { USBPortContext } from "./context";

const USBPortProvider = ({ children }: PropsWithChildren) => {
  const [port, setPort] = useState<any>();
  return (
    <USBPortContext.Provider
      value={{
        port,
        setPort,
      }}
    >
      {children}
    </USBPortContext.Provider>
  );
};

export default USBPortProvider;
