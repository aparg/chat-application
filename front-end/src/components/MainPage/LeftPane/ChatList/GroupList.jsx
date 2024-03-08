import { useState, useEffect } from "react";
import addIcon from "../../../../assets/images/icons/add-icon.png";
import CreateGroup from "./CreateGroup";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import GroupCard from "./GroupCard";
import useReceiver from "../../../../hooks/useReceiver";
import { socket } from "../../../../socket/socket";
import useConversationId from "../../../../hooks/useConversationId";

const GroupList = () => {
  const [popUp, setPopUp] = useState(null);
  const [groups, setGroups] = useState([]);
  const { receiver, setReceiver } = useReceiver();
  const { setConversationId } = useConversationId();
  const privateAxios = usePrivateAxios();
  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    const response = await privateAxios.post("/groups/get");
    const groupsResponse = response?.data;
    setGroups(groupsResponse);
  };
  const roomJoin = async ({ groupname }) => {
    try {
      const CONVERSATION_URL = "/conversation";
      const response = await privateAxios.post(
        CONVERSATION_URL,
        JSON.stringify({
          receiverName: groupname,
          group: true,
        })
      );
      const newConversationId = response?.data?.conversationId;
      newConversationId &&
        socket.emit("join room", {
          conversationId: newConversationId,
        });
      // setReceiver({ username: groupname });
      setConversationId(newConversationId);
    } catch (err) {
      console.log("Error joining room");
    }
  };
  return (
    <div className="relative flex flex-col w-full h-full items-center">
      {popUp && <CreateGroup joinRoom={(val) => roomJoin(val)} />}
      {groups.map((data) => {
        return (
          <GroupCard groupname={data.name} joinRoom={(val) => roomJoin(val)} />
        );
      })}
      <img
        className="absolute bottom-0 cursor-pointer w-1/12"
        onClick={() => setPopUp(!popUp)}
        src={addIcon}
      ></img>
    </div>
  );
};

export default GroupList;
