import { PropsWithChildren, useState } from "react";
import ConversationContext from "./context";
import { Conversation } from "../types/conversation";

const ConversationProvider = (props: PropsWithChildren) => {
  const [selectedConversation, setSelectedConversation] = useState<
    Partial<Conversation>
  >({});
  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
