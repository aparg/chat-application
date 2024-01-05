import React from "react";
import { useEffect, useState } from "react";
import useReceiverName from "../../../hooks/useReceiverName";
import useJoinRoom from "../../../hooks/useJoinRoom";
import { axiosPrivate } from "../../../api/axios";
import usePrivateAxios from "../../../hooks/usePrivateAxios";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../../hooks/useAuth";
import UserCard from "./UserCard";
import useFriendList from "../../../hooks/useFriendList";

export const FriendList = () => {
  const { friends, setFriends } = useFriendList();
  const { auth } = useAuth();
  const axiosPrivate = usePrivateAxios();
  useEffect(() => {
    const getUsers = async () => {
      const response = await axiosPrivate.post("/allusers", {
        senderName: auth.name,
      });
      setFriends(response?.data);
    };
    getUsers();
  }, []);
  useJoinRoom();
  return (
    <section className="bg-light-cream rounded-lg p-3 items-center flex flex-col overflow-auto basis-5/12">
      {friends?.map((element) => (
        <UserCard name={element} key={uuidv4()} />
      ))}
    </section>
  );
};
