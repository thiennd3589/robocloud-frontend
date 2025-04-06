import { PropsWithChildren, useState } from "react";
import { USBPortContext } from "./context";

const USBPortProvider = ({ children }: PropsWithChildren) => {
  const [port, setPort] = useState<any>();
  const [reader, setReader] = useState<any>();
  const [writer, setWriter] = useState<any>();
  return (
    <USBPortContext.Provider
      value={{
        port,
        reader,
        writer,
        setPort,
        setReader,
        setWriter,
      }}
    >
      {children}
    </USBPortContext.Provider>
  );
};

export default USBPortProvider;
