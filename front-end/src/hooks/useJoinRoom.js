import useReceiver from "./useReceiver";
import useConversationId from "./useConversationId";
import usePrivateAxios from "./usePrivateAxios";
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
//hook to post conversation url and get conversation id which is used as a room id to join the room
//name arg is the name of the user
const useJoinRoom = async (config = { group: false }) => {
  const [loading, setLoading] = useState();
  const [err, setErr] = useState();
  const { receiver } = useReceiver();
  const { setConversationId } = useConversationId();
  const axiosPrivate = usePrivateAxios();
  useEffect(() => {
    if (receiver?.username) {
      const roomJoin = async () => {
        try {
          const CONVERSATION_URL = "/conversation";
          setLoading(true);
          const response = await axiosPrivate.post(
            CONVERSATION_URL,
            JSON.stringify({
              receiverName: receiver.username,
              group: config.group,
            })
          );
          setLoading(false);
          const newConversationId = response?.data?.conversationId;
          newConversationId &&
            socket.emit("join room", {
              conversationId: newConversationId,
            });
          setConversationId(newConversationId);
        } catch (err) {
          setErr(err);
        }
      };
      roomJoin();
    }
  }, [receiver?.username]);
  return { loading, err };
};

export default useJoinRoom;
