import React from "react";

export const USBPortContext = React.createContext<{
  port?: any;
  setPort: (port: any) => void;
}>({
  setPort(_port) {},
});
