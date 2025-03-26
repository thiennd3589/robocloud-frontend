import React from "react";

type ConversationContextValue = {
  selectedConversation?: string;
  setSelectedConversation: (id: string) => void;
};

const ConversationContext = React.createContext<ConversationContextValue>({
  setSelectedConversation(_id) {},
});

export default ConversationContext;
