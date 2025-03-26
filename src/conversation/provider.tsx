import { PropsWithChildren, useState } from "react";
import ConversationContext from "./context";

const ConversationProvider = (props: PropsWithChildren) => {
  const [selectedConversation, setSelectedConversation] = useState<string>();
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
