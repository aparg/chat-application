import { createContext, useState } from "react";
//stores name of the user whose chat is open in the chat pane
const ReceiverContext = createContext({});

export const ReceiverProvider = ({ children }) => {
  const [receiver, setReceiver] = useState("");
  return (
    <ReceiverContext.Provider value={{ receiver, setReceiver }}>
      {children}
    </ReceiverContext.Provider>
  );
};

export default ReceiverContext;
