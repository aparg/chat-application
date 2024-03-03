import React, { useState, useEffect } from "react";
import FriendRequestCard from "./FriendRequestCard";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import { socket } from "../../../../socket/socket";
import { v4 as uuidv4 } from "uuid";
function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const privateAxios = usePrivateAxios();
  console.log(friendRequests);
  useEffect(() => {
    getFriendList();
    socket.on("friendRequest", (data) => {
      setFriendRequests((prevRequests) => {
        return [...prevRequests, data];
      });
    });
    return () => {
      socket.off("friendRequest");
    };
  }, []);

  const getFriendList = () => {
    console.log("REFRESHING..");
    privateAxios
      .post("/showFriendRequests")
      .then((result) => {
        setFriendRequests(result?.data);
      })
      .catch((err) => {
        console.error("Couldn't fetch friend requests");
        console.log(err);
      });
  };

  return friendRequests?.map((friendRequest) => (
    <FriendRequestCard
      username={friendRequest.username}
      refreshFriendReqList={getFriendList}
      key={uuidv4()}
      yo={() => console.log("yo")}
    />
  ));
}

export default FriendRequests;
