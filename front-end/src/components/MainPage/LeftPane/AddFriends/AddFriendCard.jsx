import { useState } from "react";
import profileImg from "../../../../assets/images/profile.jpg";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import PrimaryButton from "../../../Button/PrimaryButton";
const AddFriendCard = ({ username, profilePhoto }) => {
  const [requestSent, setRequestSent] = useState(false);
  const privateAxios = usePrivateAxios();
  const sendRequest = async () => {
    await privateAxios
      .post("/addfriends", { receiverName: username })
      .then(() => setRequestSent(true));
  };
  return (
    <div
      className={`flex items-center my-1.5 w-full rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer justify-center bg-light-cream
      }`}
    >
      <img
        className="rounded-full w-1/6 basis-1/6  clip-circle"
        src={profilePhoto || profileImg}
      ></img>
      {/* <div className="flex items-center justify-left "> */}
      <div className="text-black font-bold text-2xl md:text-sm basis-2/6 w-full text-center">
        {username}
      </div>
      <PrimaryButton
        text={requestSent ? "Request Sent!" : "Add Friend"}
        clicked={sendRequest}
      />
    </div>
  );
};
export default AddFriendCard;
