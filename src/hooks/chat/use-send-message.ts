import { useAddPrivateChatMutation } from "../../services/private-chat";
import { useAddPublicChatMutation } from "../../services/public-chat";

export const useSendMessage = () => {
  const [addPublicChat] = useAddPublicChatMutation();
  const [addPrivateChat] = useAddPrivateChatMutation();

  return (input: string, conversationId?: string, isGenerateCode?: boolean) => {
    if (!conversationId) {
      return addPublicChat({ input });
    }

    return addPrivateChat({ input, conversationId, isGenerateCode });
  };
};
