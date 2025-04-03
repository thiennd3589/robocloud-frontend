import { useContext, useEffect, useMemo } from "react";
import Message from "../../../../components/Message";
import { useLazyGetPrivateChatQuery } from "../../../../services/private-chat";
import { useGetPublicChatQuery } from "../../../../services/public-chat";
import ConversationContext from "../../../../conversation/context";
import { useIsAuthenticated } from "../../../../auth/hooks/use-is-authenticated";
import LayoutContext from "../../../../layout/main-layout/context";
import GenCodeButton from "../../../../components/gen-code-btn";
import { ChatRole } from "../../../../types/chat";

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
        {realData &&
          realData?.length > 1 &&
          realData[realData.length - 1].role === ChatRole.MODEL &&
          selectedConversation.id && (
            <GenCodeButton
              style={{
                alignSelf: "flex-end",
              }}
              className="mx-6"
              conversationId={selectedConversation.id}
              lastMessage={realData[realData.length - 1]}
            />
          )}
        <div ref={chatRef} className={"h-[30vh]"}></div>
      </div>
    </>
  );
};

export default ChatFrame;
