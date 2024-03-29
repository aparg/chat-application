import React, { useState, useEffect } from "react";
import FriendRequestCard from "./FriendRequestCard";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import { socket } from "../../../../socket/socket";
import { v4 as uuidv4 } from "uuid";
function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const privateAxios = usePrivateAxios();
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

  const removeFriendRequest = (username) => {
    const filteredFriendRequests = friendRequests.filter((friendReq) => {
      friendReq.username !== username;
    });
    setFriendRequests(filteredFriendRequests);
  };

  const getFriendList = () => {
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
      profilePhoto={friendRequest.profilePhoto}
      removeCard={() => removeFriendRequest(friendRequest.username)}
      key={uuidv4()}
    />
  ));
}

export default FriendRequests;
