import { Buffer } from "buffer";
import { bufferEqual } from "../utils";
import Statics from "./constants";

export const receiveData = async (reader, timeout, responseLength) => {
  console.log("=== start receive data ===");
  const startingBytes = [Statics.Resp_STK_INSYNC];

  let buffer = Buffer.alloc(0);
  let started = false;
  let timeoutId = null;
  let isReading = false;
  let error = null;

  const finished = (err) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    isReading = false;
    error = err;
  };

  const handleChunk = (data) => {
    let index = 0;
    while (!started && index < data.length) {
      const byte = data[index];
      if (startingBytes.indexOf(byte) !== -1) {
        data = data.slice(index, data.length - index);
        started = true;
      }
      index++;
    }

    console.log(
      "cccc",
      {
        buffer,
        data,
      },
      Buffer.concat([buffer, data])
    );

    if (started) {
      buffer = Buffer.concat([buffer, data]);
    }
    console.log(buffer.length, responseLength);
    if (buffer.length > responseLength) {
      finished(
        new Error(`buffer overflow ${buffer.length} > ${responseLength}`)
      );
    } else if (buffer.length == responseLength) {
      finished();
    }

    console.log("=== end receive data ===");
  };

  if (timeout && timeout > 0) {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      finished(new Error(`receiveData timeout after ${timeout}ms`));
    }, timeout);
  }

  if (reader) {
    isReading = true;
    while (isReading) {
      try {
        console.log("reading...");
        reader.closed?.then(() => {
          console.log("reader error");
        });
        const { value, done } = await reader.read();
        console.log("value veceived", value);
        if (done) {
          break;
        }

        handleChunk(value);
      } catch (err) {
        throw err;
      }
    }
    if (error) {
      throw error;
    }
    return buffer;

    console.log("Hàm receiveData đã chạy xong");
  } else {
    throw new Error(`serial port not found`);
  }
};

export const sendCommand = async ({ reader, writer }, opt) => {
  const timeout = opt.timeout || 0;
  let responseData = null;
  let responseLength = 0;

  if (opt.responseData && opt.responseData.length > 0) {
    console.log("11111");
    responseData = opt.responseData;
  }
  if (responseData) {
    console.log("2222");
    responseLength = responseData.length;
  }
  if (opt.responseLength) {
    console.log("3333");

    responseLength = opt.responseLength;
  }
  let cmd = opt.cmd;
  if (cmd instanceof Array) {
    console.log("== convert cmd to buffer");
    cmd = Buffer.from(cmd.concat(Statics.Sync_CRC_EOP));
  }
  if (reader && writer) {
    try {
      console.log("== write cmd ==");
      console.log(writer);
      writer.write(cmd);
      console.log("command sended");
    } catch (err) {
      throw new Error(`Sending ${cmd.toString("hex")} : {err.message}`);
    }
    try {
      console.log(reader);
      const data = await receiveData(reader, timeout, responseLength);
      console.log("receive data", data);
      if (responseData && !bufferEqual(data, responseData)) {
        throw new Error(
          `${cmd} response mismatch: ${data.toString(
            "hex"
          )}, ${responseData.toString("hex")}`
        );
      }
      console.log("dmm receive data", data);

      return data;
    } catch (err) {
      throw new Error(`Sending ${cmd.toString("hex")}: ${err.message}`);
    }
  } else {
    throw new Error(`serial port not found`);
  }
};
