import { createContext, useState } from "react";
const ConversationContext = createContext({});

export const ConversationProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState();
  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId }}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;
