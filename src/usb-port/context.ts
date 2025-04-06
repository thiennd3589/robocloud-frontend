import React from "react";

export const USBPortContext = React.createContext<{
  port?: any;
  reader?: any;
  writer?: any;
  setPort: (port: any) => void;
  setReader: (reader: any) => void;
  setWriter: (writer: any) => void;
}>({
  setPort(_port) {},
  setReader(_reader) {},
  setWriter(_writer) {},
});
