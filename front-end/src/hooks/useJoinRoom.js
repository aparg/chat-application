import useReceiverName from "./useReceiverName";
import useConversationId from "./useConversationId";
import usePrivateAxios from "./usePrivateAxios";
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
//hook to post conversation url and get conversation id which is used as a room id to join the room
//name arg is the name of the user
const useJoinRoom = async () => {
  const [loading, setLoading] = useState();
  const [err, setErr] = useState();
  const { receiverName, setReceiverName } = useReceiverName();
  const { setConversationId } = useConversationId();
  const axiosPrivate = usePrivateAxios();
  useEffect(() => {
    if (receiverName) {
      const roomJoin = async () => {
        try {
          const CONVERSATION_URL = "/conversation";
          setLoading(true);
          const response = await axiosPrivate.post(
            CONVERSATION_URL,
            JSON.stringify({ receiverName: receiverName })
          );
          setLoading(false);
          const newConversationId = response?.data?.conversationId;
          socket.emit("join room", {
            conversationId: newConversationId,
          });
          console.log(newConversationId);
          setReceiverName(receiverName);
          setConversationId(newConversationId);
        } catch (err) {
          setErr(err);
        }
      };
      roomJoin();
    }
  }, [receiverName]);
  return { loading, err };
};

export default useJoinRoom;
