import { useState } from "react";
import profileImg from "../../../../assets/images/profile.jpg";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import { socket } from "../../../../socket/socket";
import useAuth from "../../../../hooks/useAuth";
const AddFriendCard = ({ username }) => {
  const [requestSent, setRequestSent] = useState(false);
  const { user } = useAuth();
  const privateAxios = usePrivateAxios();
  // const axiosPrivate = usePrivateAxios();
  const sendRequest = async () => {
    await privateAxios.post("/addfriends", { receiverName: username });
  };

  return (
    <div
      className={`flex items-center my-1.5 w-full rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer justify-center 
      }`}
    >
      <img className="rounded-full w-1/6 basis-1/6" src={profileImg}></img>
      {/* <div className="flex items-center justify-left "> */}
      <div className="text-black font-bold text-2xl md:text-sm basis-2/6 w-full text-center">
        {username}
      </div>
      <button className="bg-gray basis-3/6 w-full" onClick={sendRequest}>
        {requestSent ? "Request Sent!" : "Add Friend"}
      </button>
      {/* </div> */}
    </div>
  );
};
export default AddFriendCard;
