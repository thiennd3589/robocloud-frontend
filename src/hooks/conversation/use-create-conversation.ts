import { useContext } from "react";
import { useCreateConversationMutation } from "../../services/conversation";
import ConversationContext from "../../conversation/context";
import { useHandleSendMessage } from "../chat/use-handle-send-message";

export const useCreateConversation = () => {
  const [trigger] = useCreateConversationMutation();
  const { setSelectedConversation } = useContext(ConversationContext);
  const sendMessage = useHandleSendMessage();
  return async (title: string, input: string) => {
    const trimTitle = title.trim();
    const trimInput = input.trim();
    const { data } = await trigger({ title: trimTitle });
    if (data) {
      setSelectedConversation(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await sendMessage(trimInput, data.id);
    }
  };
};
