import React from "react";
import { useEffect, useState } from "react";
import useJoinRoom from "../../../../hooks/useJoinRoom";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../../../hooks/useAuth";
import UserCard from "../UserCard";
import useFriendList from "../../../../hooks/useFriendList";
import Loading from "../../../Loading/Loading";
import { socket } from "../../../../socket/socket";

export const FriendList = () => {
  const { friends, setFriends } = useFriendList();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = usePrivateAxios();
  useEffect(() => {
    socket.on("refreshFriendList", () => getUsers());
    getUsers();
    return () => {
      socket.off("refreshFriendList");
    };
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axiosPrivate.post("/friends/get", {
      senderName: auth.name,
    });
    setLoading(false);
    setFriends(response?.data);
  };

  useJoinRoom();
  return (
    <>
      {!loading ? (
        friends?.map((element) => (
          <UserCard
            username={element.username}
            profilePhoto={element.profilePhoto}
            key={uuidv4()}
          />
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};
