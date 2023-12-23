import React, { useEffect, useState } from "react";
import UserDetails from "./LeftPane/UserDetails";
import { ReceiverProvider } from "../../context/ReceiverContext";
import Chat from "./ChatBox/Chat";
import ChatDetails from "./RightPane/ChatDetails";
import { socket } from "../../socket/socket";

const MainPage = () => {
  const [isConnected, setIsConnected] = useState(socket.isConnected);

  return (
    <ReceiverProvider>
      <div className="w-screen h-screen p-5 flex flex-row w-10/12 justify-between">
        <UserDetails />
        <Chat />
        <ChatDetails />
      </div>
    </ReceiverProvider>
  );
};

export default MainPage;
