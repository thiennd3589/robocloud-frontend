import { useContext, useState } from "react";
import ConversationContext from "../../conversation/context";
import { useHandleSendMessage } from "../../hooks/chat/use-handle-send-message";
import { useIsAuthenticated } from "../../auth/hooks/use-is-authenticated";
import { useCreateConversation } from "../../hooks/conversation/use-create-conversation";
import LayoutContext from "../../layout/main-layout/context";

const SendInput = () => {
  const { selectedConversation } = useContext(ConversationContext);
  const { chatRef } = useContext(LayoutContext);
  const isAuthenticated = useIsAuthenticated();
  const [inputValue, setInputValue] = useState("");
  const handleSendMessage = useHandleSendMessage();
  const createConversation = useCreateConversation();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      chatRef.current?.scrollIntoView();
      setInputValue("");
      if (isAuthenticated && !selectedConversation.id) {
        await createConversation(inputValue, inputValue);
      } else {
        await handleSendMessage(inputValue, selectedConversation.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          className="flex-1 p-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
          disabled={loading}
        />
        <button
          onClick={onSubmit}
          className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendInput;
