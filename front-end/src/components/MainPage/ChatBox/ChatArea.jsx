import React, { useEffect, useRef, useState } from "react";
import useConversationId from "../../../hooks/useConversationId";
import { socket } from "../../../socket/socket";
import ChatBubble from "./ChatBubble";
import useAuth from "../../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
import CenterBox from "../../../Layouts/CenterBox";
import Loading from "../../Loading/Loading";

export const ChatArea = () => {
  const { conversationId } = useConversationId();
  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatDivRef = useRef(null);
  useEffect(() => {
    setMessages([]);
    setLoading(true);
    socket.emit("get message", { conversationId, sender: auth.name });
  }, [conversationId]);
  useEffect(() => {
    socket.on("message response", (data) => {
      console.log(data);
      setMessages(data);
      setLoading(false);
    });
    return () => socket.off("message response");
  }, []);
  useEffect(() => {
    const div = chatDivRef.current;
    div.scrollTo(0, div.scrollHeight);
  });
  return (
    <>
      <CenterBox ref={chatDivRef}>
        {!loading ? (
          messages.map((data) => {
            const senderName = data?.sender?.username;
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
                  group={true}
                  writerName={data?.sender.username}
                />
              );
            }
          })
        ) : (
          <Loading />
        )}
      </CenterBox>
    </>
  );
};
