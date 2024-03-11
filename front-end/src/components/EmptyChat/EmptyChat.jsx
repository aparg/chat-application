import React from "react";
import CenterBox from "../../Layouts/CenterBox";
import emptyChat from "../../assets/images/icons/empty-chat.png";
import ChatTitle from "../MainPage/ChatBox/ChatTitle";
import Layout from "../MainPage/ChatBox/Layout";

const EmptyChat = () => {
  return (
    <>
      <ChatTitle titleValue={null} />
      <CenterBox>
        <div className="w-full h-full flex flex-col items-center justify-center text-dark-gray">
          <img src={emptyChat} className="w-1/6" />
          <span className="font-extrabold mt-5 text-3xl">Your Messages</span>
          Select a conversation!
        </div>
      </CenterBox>
    </>
  );
};

export default EmptyChat;
