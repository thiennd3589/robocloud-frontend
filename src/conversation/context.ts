import React from "react";
import { Conversation } from "../types/conversation";

type ConversationContextValue = {
  selectedConversation: Partial<Conversation>;
  setSelectedConversation: (conv: Partial<Conversation>) => void;
};

const ConversationContext = React.createContext<ConversationContextValue>({
  setSelectedConversation() {},
  selectedConversation: {},
});

export default ConversationContext;
