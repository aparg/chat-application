import React, { useEffect, useState } from "react";
import UserDetails from "./LeftPane/UserDetails";
import { ReceiverProvider } from "../../context/ReceiverContext";
import Chat from "./ChatBox/Chat";
import ChatDetails from "./RightPane/ChatDetails";
import { socket } from "../../socket/socket";
import { ConversationProvider } from "../../context/ConversationContext";

const MainPage = () => {
  const [isConnected, setIsConnected] = useState(socket.isConnected);

  return (
    <ReceiverProvider>
      <ConversationProvider>
        <div className="w-screen h-screen p-5 flex flex-row w-10/12 justify-between">
          <UserDetails />
          <Chat />
          <ChatDetails />
        </div>
      </ConversationProvider>
    </ReceiverProvider>
  );
};

export default MainPage;
