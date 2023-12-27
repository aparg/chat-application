import React, { useEffect, useState } from "react";
import useConversationId from "../../../hooks/useConversationId";
import { socket } from "../../../socket/socket";
import ChatBubble from "./ChatBubble";
import useAuth from "../../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

export const ChatArea = () => {
  const { conversationId } = useConversationId();
  const { auth } = useAuth();
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    socket.on("message response", (data) => {
      console.log("naya data");
      setMessages(data);
    });
    socket.emit("get message", { conversationId, sender: auth.name });
  }, []);

  return (
    <>
      {console.log("chat area refreshed")}
      <section className="flex flex-col">
        {messages &&
          messages.map((data) => {
            const senderName = data.sender.name;
            //determine if it is a sender message or not
            if (senderName === auth.name) {
              return (
                <ChatBubble
                  content={data.content}
                  sender={true}
                  key={uuidv4()}
                />
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
