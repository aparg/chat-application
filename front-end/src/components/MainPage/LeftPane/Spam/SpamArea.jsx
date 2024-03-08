import { useRef, useState, useEffect } from "react";
import useConversationId from "../../../../hooks/useConversationId";
import useAuth from "../../../../hooks/useAuth";
import CenterBox from "../../../../Layouts/CenterBox";
import { socket } from "../../../../socket/socket";
import Loading from "../../../Loading/Loading";
import ChatBubble from "../../ChatBox/ChatBubble";
import { v4 as uuidv4 } from "uuid";
import useJoinRoom from "../../../../hooks/useJoinRoom";

const SpamArea = () => {
  const { conversationId } = useConversationId();
  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatDivRef = useRef(null);
  useEffect(() => {
    setMessages([]);
    setLoading(true);
    socket.emit("get spam message", { conversationId, sender: auth.name });
    socket.on("message spam response", (data) => {
      setMessages(data);
      setLoading(false);
    });
    return () => socket.off("message spam response");
  }, [conversationId]);
  useEffect(() => {
    const div = chatDivRef.current;
    div.scrollTo(0, div.scrollHeight);
  });
  useJoinRoom();
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
                  writerName={data?.sender?.username}
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

export default SpamArea;
