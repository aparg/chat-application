import React, { useState } from "react";
import { FriendList } from "./FriendList";
import GroupList from "./GroupList";
import Spam from "../Spam/Spam";

const ChatList = () => {
  const [chatType, setChatType] = useState("primary");
  return (
    <div className="basis-5/12">
      <div className="flex flex-row text-xs py-2 w-100 text-dark-gray">
        <span
          className={`hover:text-dark-brown cursor-pointer mx-4 ${
            chatType === "primary" && `text-dark-brown font-bold`
          }`}
          onClick={() => chatType !== "primary" && setChatType("primary")}
        >
          Primary
        </span>
        <span
          className={`hover:text-dark-brown cursor-pointer mx-4 ${
            chatType === "group" && `text-dark-brown font-bold `
          }`}
          onClick={() => chatType !== "group" && setChatType("group")}
        >
          Group
        </span>
        <span
          className={`hover:text-dark-brown cursor-pointer mx-4 ${
            chatType === "spam" && `text-dark-brown font-bold`
          }`}
          onClick={() => chatType !== "spam" && setChatType("spam")}
        >
          Spam
        </span>
      </div>
      <section className="bg-light-cream h-5/6 rounded-lg p-3 items-center flex flex-col overflow-auto">
        {chatType === "primary" && <FriendList />}
        {chatType === "group" && <GroupList />}
        {chatType === "spam" && <Spam />}
      </section>
    </div>
  );
};

export default ChatList;
