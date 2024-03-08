import { useState } from "react";
import profileImg from "../../../assets/images/profile.jpg";
import useReceiver from "../../../hooks/useReceiver";
import usePrivateAxios from "../../../hooks/usePrivateAxios";

const Member = ({ username }) => {
  const [added, setAdded] = useState(false);
  const { receiver } = useReceiver();
  const privateAxios = usePrivateAxios();
  const handleClick = async () => {
    await privateAxios.post("/groups/addMember", {
      username,
      groupName: receiver.username,
    });
    setAdded(true);
  };
  return (
    <div
      className={`self-center flex items-center my-1.5 w-11/12 rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer `}
    >
      <img className="rounded-full w-1/6 clip-circle" src={profileImg}></img>
      <div className="text-black font-bold text-2xl md:text-sm">{username}</div>
      <div className="bg-dark-gray p-3 cursor-pointer" onClick={handleClick}>
        {added ? "ADDED" : "ADD"}
      </div>
    </div>
  );
};

export default Member;
