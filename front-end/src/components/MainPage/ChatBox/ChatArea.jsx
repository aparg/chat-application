import React, { useEffect, useRef, useState } from "react";
import useConversationId from "../../../hooks/useConversationId";
import { socket } from "../../../socket/socket";
import ChatBubble from "./ChatBubble";
import useAuth from "../../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

export const ChatArea = () => {
  const { conversationId } = useConversationId();
  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const chatDivRef = useRef(null);
  useEffect(() => {
    socket.emit("get message", { conversationId, sender: auth.name });
    socket.on("message response", (data) => {
      setMessages(data);
    });
  }, [conversationId]);
  useEffect(() => {
    const div = chatDivRef.current;
    div.scrollTo(0, div.scrollHeight);
    console.log(div);
  });
  return (
    <>
      <section
        className="flex flex-col overflow-y-scroll h-4/5 p-3 w-full"
        ref={chatDivRef}
      >
        {messages.map((data) => {
          console.log(data);
          const senderName = data.sender.username;
          //determine if it is a sender message or not
          console.log(senderName, auth.name);
          if (senderName === auth.name) {
            return (
              <ChatBubble content={data.content} sender={true} key={uuidv4()} />
            );
          } else {
            return (
              <ChatBubble
                content={data.content}
                sender={false}
                key={uuidv4()}
              />
            );
          }
        })}
      </section>
    </>
  );
};
