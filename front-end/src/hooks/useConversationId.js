import { useContext } from "react";
import ConversationContext from "../context/ConversationContext";
const useConversationId = () => {
  return useContext(ConversationContext);
};

export default useConversationId;
