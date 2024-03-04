import { createContext, useState } from "react";
//stores name of the user whose chat is open in the chat pane
const SuggestedFriendsContext = createContext({});

export const SuggestedFriendsProvider = ({ children }) => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  return (
    <SuggestedFriendsContext.Provider
      value={{ suggestedFriends, setSuggestedFriends }}
    >
      {children}
    </SuggestedFriendsContext.Provider>
  );
};

export default SuggestedFriendsContext;
