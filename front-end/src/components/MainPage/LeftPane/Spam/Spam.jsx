import { useEffect } from "react";
import useFriendList from "../../../../hooks/useFriendList";
import SpamCard from "./SpamCard";
import { v4 as uuidv4 } from "uuid";
import useJoinRoom from "../../../../hooks/useJoinRoom";
import useReceiver from "../../../../hooks/useReceiver";

const Spam = () => {
  const { friends } = useFriendList();
  const { setReceiver } = useReceiver();
  useEffect(() => {
    setReceiver(null);
  }, []);
  useJoinRoom();
  return (
    <>
      {friends?.map((element) => (
        <SpamCard
          username={element.username}
          profilePhoto={element.profilePhoto}
          key={uuidv4()}
        />
      ))}
    </>
  );
};

export default Spam;
