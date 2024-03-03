import { createContext, useState } from "react";
//stores name of the user whose chat is open in the chat pane
const FriendRequests = createContext({});

export const FriendRequestsProvider = ({ children }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  return (
    <FriendRequests.Provider value={{ friendRequests, setFriendRequests }}>
      {children}
    </FriendRequests.Provider>
  );
};

export default FriendRequests;
