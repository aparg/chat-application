import React, { useEffect, useState } from "react";
import UserDetails from "./LeftPane/UserDetails";
import { ReceiverProvider } from "../../context/ReceiverContext";
import CenterBox from "./ChatBox/CenterBox";
import ChatDetails from "./RightPane/ChatDetails";
import { socket } from "../../socket/socket";
import { ConversationProvider } from "../../context/ConversationContext";
import { SuggestedFriendsProvider } from "../../context/SuggestedFriendsContext";
import { ModeProvider } from "../../context/ModeContext";
import { FriendRequestsProvider } from "../../context/FriendRequestsContext";
import { FriendsProvider } from "../../context/FriendsContext";

const MainPage = () => {
  const [isConnected, setIsConnected] = useState(socket.isConnected);
  return (
    <ReceiverProvider>
      <ConversationProvider>
        <SuggestedFriendsProvider>
          <FriendsProvider>
            <FriendRequestsProvider>
              <ModeProvider>
                <div className="w-screen h-screen p-5 flex flex-row w-10/12 justify-between">
                  <UserDetails />
                  <CenterBox />
                  <ChatDetails />
                </div>
              </ModeProvider>
            </FriendRequestsProvider>
          </FriendsProvider>
        </SuggestedFriendsProvider>
      </ConversationProvider>
    </ReceiverProvider>
  );
};

export default MainPage;
