import { useAppDispatch } from "../../redux/hooks";
import { privateChatApi } from "../../services/private-chat";
import { publicChatApi } from "../../services/public-chat";
import { Chat, ChatRole } from "../../types/chat";

export const useUpsertModelResponse = () => {
  const dispatch = useAppDispatch();

  return (data: Chat[] | Chat, conversationId?: string) => {
    if (!conversationId) {
      dispatch(
        publicChatApi.util.updateQueryData(
          "getPublicChat",
          undefined,
          (chats) => {
            (data as Chat[]).forEach((item) =>
              chats.push({ ...item, role: ChatRole.MODEL })
            );
          }
        )
      );
    } else {
      dispatch(
        privateChatApi.util.updateQueryData(
          "getPrivateChat",
          conversationId,
          (chats) => {
            chats.push({ ...(data as Chat), role: ChatRole.MODEL });
          }
        )
      );
    }
  };
};
