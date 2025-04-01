//eslint-disable-next-line
//@ts-ignore
import avrbro from "avrbro";

export const uploadCode = async (
  port: any,
  hexString: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const { usbVendorId } = port.getInfo();
  const formattedHex = hexString.replace(/\\n/g, "\n");
  const hexBuffer = avrbro.parseHex(formattedHex);

  const serial = await avrbro.openSerial({
    baudRate: 115200,
    filters: [
      {
        usbVendorId: usbVendorId.toString(16),
      },
    ],
  });

  if (serial) {
    // avalaible boards are listed in https://github.com/kaelhem/avrbro/tree/master/src/boards.js
    const options = {
      boardName: "nano",
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
};
