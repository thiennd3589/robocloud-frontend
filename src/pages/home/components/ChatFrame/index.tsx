import { useContext, useEffect, useMemo } from "react";
import Message from "../../../../components/Message";
import { useLazyGetPrivateChatQuery } from "../../../../services/private-chat";
import { useGetPublicChatQuery } from "../../../../services/public-chat";
import ConversationContext from "../../../../conversation/context";
import { useIsAuthenticated } from "../../../../auth/hooks/use-is-authenticated";
import LayoutContext from "../../../../layout/main-layout/context";

const ChatFrame = () => {
  const { selectedConversation } = useContext(ConversationContext);
  const isAuthenticated = useIsAuthenticated();
  const { data } = useGetPublicChatQuery(undefined);
  const [trigger, result] = useLazyGetPrivateChatQuery();
  const { chatRef } = useContext(LayoutContext);
  useEffect(() => {
    if (selectedConversation?.id && isAuthenticated)
      trigger(selectedConversation.id);
  }, [selectedConversation, isAuthenticated, trigger]);

  const realData = useMemo(() => {
    if (selectedConversation?.id && isAuthenticated) {
      return result.data;
    }
    return data;
  }, [selectedConversation, isAuthenticated, data, result]);

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto">
        {realData?.map((chat, index) => (
          <Message key={chat?.id ?? index} chat={chat} />
        ))}
        <div ref={chatRef}></div>
      </div>
    </>
  );
};

export default ChatFrame;
