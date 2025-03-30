import { useAppDispatch } from "../../redux/hooks";
import { privateChatApi } from "../../services/private-chat";
import { publicChatApi } from "../../services/public-chat";
import { ChatRole } from "../../types/chat";

export const useUpsertUserInput = () => {
  const dispatch = useAppDispatch();

  return (input: string, conversationId?: string) => {
    if (!conversationId) {
      dispatch(
        publicChatApi.util.updateQueryData(
          "getPublicChat",
          undefined,
          (chats) => {
            chats.push({
              content: {
                parts: [{ text: input }],
              },
              role: ChatRole.USER,
            });
          }
        )
      );
    } else {
      dispatch(
        privateChatApi.util.updateQueryData(
          "getPrivateChat",
          conversationId,
          (chats) => {
            chats.push({
              content: {
                parts: [{ text: input }],
              },
              role: ChatRole.USER,
            });
          }
        )
      );
    }
  };
};
