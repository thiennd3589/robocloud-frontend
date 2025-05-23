import { Buffer } from "buffer";

const Resp_STK_INSYNC = 0x14;
const Resp_STK_OK = 0x10;

export default {
  Cmnd_STK_GET_SYNC: 0x30,
  Cmnd_STK_SET_DEVICE: 0x42,
  Cmnd_STK_ENTER_PROGMODE: 0x50,
  Cmnd_STK_LOAD_ADDRESS: 0x55,
  Cmnd_STK_PROG_PAGE: 0x64,
  Cmnd_STK_LEAVE_PROGMODE: 0x51,
  Cmnd_STK_READ_SIGN: 0x75,

  Sync_CRC_EOP: 0x20,

  Resp_STK_OK: 0x10,
  Resp_STK_INSYNC: 0x14,
  Resp_STK_NOSYNC: 0x15,

  Cmnd_STK_READ_PAGE: 0x74,

  OK_RESPONSE: Buffer.from([Resp_STK_INSYNC, Resp_STK_OK]),
};
