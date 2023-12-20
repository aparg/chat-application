import { createContext, useState } from "react";
//stores name of the user whose chat is open in the chat pane
const ReceiverContext = createContext({});

export const ReceiverProvider = ({ children }) => {
  const [receiverName, setReceiverName] = useState("");
  console.log(receiverName);
  return (
    <ReceiverContext.Provider value={{ receiverName, setReceiverName }}>
      {children}
    </ReceiverContext.Provider>
  );
};

export default ReceiverContext;
