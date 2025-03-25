import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { publicChatApi, useAddChatMutation } from "../../services/public-chat";
import { ChatRole } from "../../types/chat";

const SendInput = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const [addChat] = useAddChatMutation();

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      dispatch(
        publicChatApi.util.updateQueryData(
          "getPublicChat",
          undefined,
          (chats) => {
            chats.push({
              content: {
                parts: [{ text: inputValue }],
              },
              role: ChatRole.USER,
            });
          }
        )
      );
      const { data } = await addChat({ input: inputValue });

      if (data) {
        dispatch(
          publicChatApi.util.updateQueryData(
            "getPublicChat",
            undefined,
            (chats) => {
              data.forEach((item) => chats.push(item));
            }
          )
        );
      }
    }
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 p-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendInput;
