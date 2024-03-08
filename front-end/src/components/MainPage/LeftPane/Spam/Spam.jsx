import React from "react";
import useFriendList from "../../../../hooks/useFriendList";
import SpamCard from "./SpamCard";
import { v4 as uuidv4 } from "uuid";
import useJoinRoom from "../../../../hooks/useJoinRoom";

const Spam = () => {
  const { friends } = useFriendList();
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
