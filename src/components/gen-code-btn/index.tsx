import { Button, ButtonProps } from "antd";
import { useHandleSendMessage } from "../../hooks/chat/use-handle-send-message";
import { useContext, useMemo, useState } from "react";
import { USBPortContext } from "../../usb-port/context";
import { useNotification } from "../../notification/hooks/use-notification";
import { doRequest } from "../../http-client/request";
import { uploadCode } from "../../lib/import-code";
import { useDispatch } from "react-redux";
import { addLogs } from "../../redux/logging";
import { Chat, ChatType } from "../../types/chat";

type GenCodeButtonProps = {
  conversationId: string;
  lastMessage?: Chat;
};

enum GenCodeState {
  GENNING = "genning",
  COMPILING = "compiling",
  IDLING = "idling",
  ERROR = "error",
  COMPILING_ERROR = "compile-error",
  GEN_ERROR = "gen-error",
  SUCCESS = "success",
}

const GenCodeButton = ({
  conversationId,
  lastMessage,
  ...props
}: GenCodeButtonProps & ButtonProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSendMessage = useHandleSendMessage();
  const { port } = useContext(USBPortContext);
  const noti = useNotification();

  const [genCodeState, setGenCodeState] = useState<GenCodeState>(
    GenCodeState.IDLING
  );

  const label = useMemo(() => {
    switch (genCodeState) {
      case GenCodeState.IDLING:
        return "Tạo code";
      case GenCodeState.GENNING:
        return "Đang tạo code...";
      case GenCodeState.COMPILING:
        return "Đang compile";
      case GenCodeState.GEN_ERROR:
        return "Có lỗi xảy ra khi tạo code. Thử lại?";
      case GenCodeState.COMPILING_ERROR:
        return "Có lỗi xảy ra khi compile code. Thử lại?";
      default:
        return "Tạo code";
    }
  }, [genCodeState]);

  const checkPortSelect = () => {
    if (!port) {
      dispatchLog({ type: "error", text: "=== Chưa chọn cổng USB ===" });

      noti?.error({ message: "Chưa có cổng USB nào được chọn." });
      return false;
    }

    return true;
  };

  const onGenCode = async () => {
    setGenCodeState(GenCodeState.GENNING);
    dispatchLog({ type: "success", text: "=== Đang tạo code ===" });
    const genedCode = await handleSendMessage("Gen code", conversationId, true);

    if (!genedCode) {
      throw Error(GenCodeState.GEN_ERROR);
    }
  };

  const onUploadCode = async () => {
    const checked = checkPortSelect();
    if (!checked) return;

    dispatchLog({ type: "success", text: "=== Đang tải code ===" });
    const res = await doRequest({
      url: `/import-code/${conversationId}`,
      authen: true,
      onGotError(error) {
        if (error?.response?.data.error.message) {
          dispatchLog({
            type: "error",
            text: error.response.data.error.message,
          });
        }
        dispatchLog({ type: "error", text: "=== Tải code thất bại ===" });
        throw Error(GenCodeState.COMPILING_ERROR);
      },
    });

    const data = res?.data;
    const { hex: hexString } = data;

    // let currentReader = reader;
    // let currentWriter = writer;

    // console.log("fafnwq", checkPortOpen(port));
    // const isPortOpen = await checkPortOpen(port);
    // if (!isPortOpen) {
    //   console.log("dmmmm");
    //   await port.open({
    //     baudRate: 115200,
    //   });
    // }

    // // await port.open({
    // //   baudRate: 115200,
    // // });

    // console.log("aaaa", {
    //   currentReader,
    //   currentWriter,
    // });

    // console.log(port?.readable?.locked, port?.writable?.locked);

    // try {
    //   if (currentReader && port?.readable?.locked) {
    //     currentReader.releaseLock();
    //   }

    //   if (currentWriter && port?.writable?.locked) {
    //     currentWriter.releaseLock();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // console.log({ port });
    // const newReader = port.readable.getReader();
    // console.log({ newReader });
    // setReader(newReader);
    // currentReader = newReader;

    // const newWriter = port.writable.getWriter();
    // console.log({ newWriter });
    // setWriter(newWriter);
    // currentWriter = newWriter;

    // console.log({
    //   currentReader,
    //   currentWriter,
    // });

    await uploadCode(
      port,
      hexString,
      () => {
        dispatchLog({ type: "success", text: `=== Đang nạp code ===` });
      },
      () => {
        dispatchLog({ type: "success", text: "=== Nạp code thành công ===" });
        // port.close();
        noti?.success({ message: "Nạp code thành công!" });
      },
      (error: any) => {
        console.log("porn", error);
        dispatchLog({ type: "error", text: error?.message });
        dispatchLog({ type: "error", text: "=== Nạp code thất bại ===" });
        noti?.error({ message: "Nạp code thất bại!" });
        // port.close();
        throw Error(GenCodeState.COMPILING_ERROR);
      }
    );
  };

  // const checkPortOpen = async (port: any) => {
  //   try {
  //     const signal = await port.getSignals();
  //     console.log({ signal });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  const dispatchLog = ({
    text,
    type,
  }: {
    text: string;
    type: "success" | "error";
  }) => {
    dispatch(addLogs({ type, text }));
  };

  const genAndUpload = async () => {
    //Check port selected
    const checked = checkPortSelect();
    if (!checked) return;

    setLoading(true);

    try {
      await onGenCode();
      await onUploadCode();
    } catch (error: any) {
      switch (error.message) {
        case GenCodeState.GEN_ERROR:
          setGenCodeState(GenCodeState.GEN_ERROR);
          dispatchLog({ type: "error", text: `=== Tạo code thất bại ===` });
          break;
        case GenCodeState.COMPILING_ERROR:
          setGenCodeState(GenCodeState.COMPILING_ERROR);
          dispatchLog({ type: "error", text: `=== Tải code thất bại ===` });
          break;
        default:
          setGenCodeState(GenCodeState.ERROR);
          dispatchLog({ type: "error", text: `=== Có lỗi xảy ra ===` });
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  if (!lastMessage?.canCompiled && lastMessage?.type === ChatType.QUESTION)
    return null;

  return (
    <div>
      {lastMessage?.type !== ChatType.CODE ? (
        <Button
          size="large"
          shape="round"
          type="primary"
          loading={loading}
          onClick={genAndUpload}
          {...props}
        >
          {label}
        </Button>
      ) : (
        <Button
          size="large"
          shape="round"
          type="primary"
          loading={loading}
          onClick={async () => {
            // const checked = checkPortSelect();
            // if (!checked) return;

            setLoading(true);
            try {
              await onUploadCode();
            } catch (_e) {
              console.log("quatvn", _e);
              dispatchLog({ type: "error", text: "=== Nạp code thất bại ===" });
              setGenCodeState(GenCodeState.COMPILING_ERROR);
            } finally {
              setLoading(false);
            }
          }}
          {...props}
        >
          Nạp lại
        </Button>
      )}
    </div>
  );
};

export default GenCodeButton;
