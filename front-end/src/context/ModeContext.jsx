import { createContext, useState } from "react";
import { MODES } from "../../constants/modes";
//stores name of the user whose chat is open in the chat pane
const ModeContext = createContext({});

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.chat);
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
