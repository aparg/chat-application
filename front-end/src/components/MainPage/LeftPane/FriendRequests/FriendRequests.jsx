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
    privateAxios
      .post("/showFriendRequests")
      .then((result) => {
        setFriendRequests(result?.data);
      })
      .catch((err) => {
        console.error("Couldn't fetch friend requests");
        console.log(err);
      });
    socket.on("friendRequest", (data) => {
      console.log("Requeest aayo");
      setFriendRequests((prevRequests) => {
        return [...prevRequests, data];
      });
    });
  }, []);

  return friendRequests.map((friendRequest) => (
    <FriendRequestCard username={friendRequest.username} key={uuidv4()} />
  ));
}

export default FriendRequests;
