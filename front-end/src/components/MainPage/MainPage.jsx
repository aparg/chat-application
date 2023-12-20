import React from "react";
import UserDetails from "./LeftPane/UserDetails";
import { ReceiverProvider } from "../../context/ReceiverContext";
import Chat from "./ChatBox/Chat";
import ChatDetails from "./RightPane/ChatDetails";

const MainPage = () => {
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
