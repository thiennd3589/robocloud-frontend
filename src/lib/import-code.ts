//eslint-disable-next-line
//@ts-ignore
import avrbro from "avrbro";

function withTimeout(fn: any, timeout: number) {
  return async (...args: any) => {
    return Promise.race([
      fn(...args),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Function timed out")), timeout)
      ),
    ]);
  };
}

export const loadCode = async (
  port: any,
  hexString: string,
  onStart?: () => void,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    if (onStart) onStart();
    const formattedHex = hexString.replace(/\\n/g, "\n");
    const hexBuffer = avrbro.parseHex(formattedHex);

    await port.open({
      baudRate: 115200,
    });

    const serial = {
      port,
      reader: port.readable.getReader(),
      writer: port.writable.getWriter(),
    };

    if (serial) {
      // avalaible boards are listed in https://github.com/kaelhem/avrbro/tree/master/src/boards.js
      await avrbro.reset(serial);
      const options = {
        boardName: "uno",
        debug: true,
      };

      const success = await avrbro.flash(serial, hexBuffer, options);
      if (success) {
        if (onSuccess) onSuccess();
        console.log(".hex file uploaded on board successfully!");
      }
      avrbro.closeSerial(serial);
    } else {
      if (onError) onError();

      console.log("Operation canceled by user");
    }
  } catch (_e) {
    if (onError) onError();
  }
};

export const uploadCode = withTimeout(loadCode, 1000 * 60 * 3);
