import { createContext, useState } from "react";
//stores name of the user whose chat is open in the chat pane
const ModeContext = createContext({});

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState("chat");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
