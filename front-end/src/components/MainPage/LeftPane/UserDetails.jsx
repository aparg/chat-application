import UserCard from "./UserCard";
import profileImg from "../../../assets/images/profile.jpg";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../../hooks/useAuth";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import useReceiverName from "../../../hooks/useReceiverName";
import useJoinRoom from "../../../hooks/useJoinRoom";
import { axiosPrivate } from "../../../api/axios";
import usePrivateAxios from "../../../hooks/usePrivateAxios";
const UserDetails = () => {
  const [sampleUsers, setSampleUsers] = useState([]);
  const { auth } = useAuth();
  const axiosPrivate = usePrivateAxios();
  useEffect(() => {
    const getUsers = async () => {
      const response = await axiosPrivate.post("/allusers", {
        senderName: auth.name,
      });
      setSampleUsers(response?.data);
    };
    getUsers();
  }, []);
  useJoinRoom();
  return (
    <section className="flex flex-col w-3/12 h-full ">
      <section className="flex flex-row my-5 items-center">
        <img
          src={profileImg}
          className="rounded-full border-dark-brown border-2 shadow-gray flex-none w-1/5"
        ></img>
        <div className="text-brown-text font-light flex-auto px-5">
          @{auth.name}
        </div>
      </section>
      <SearchBar content={sampleUsers} />
      <h1 className="text-black font-bold my-5 text-3xl">Inbox</h1>
      <section className="bg-light-cream rounded-lg p-3 items-center flex flex-col">
        {sampleUsers.map((element) => (
          <UserCard name={element} key={uuidv4()} />
        ))}
      </section>
    </section>
  );
};

export default UserDetails;
