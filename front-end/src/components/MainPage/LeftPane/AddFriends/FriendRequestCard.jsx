import React from "react";
import profileImg from "../../../../assets/images/profile.jpg";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import PrimaryButton from "../../../Button/PrimaryButton";
import { SecondaryButton } from "../../../Button/SecondaryButton";

function FriendRequestCard({ username, refreshFriendList, expanded = true }) {
  const privateAxios = usePrivateAxios();
  const acceptReq = async () => {
    await privateAxios.post("manageFriendRequest/accept", { username });
    refreshFriendReqList();
  };

  const declineReq = async () => {
    await privateAxios.post("/manageFriendRequest/decline", { username });
    console.log("declining");
    refreshFriendList();
  };

  return (
    <>
      <div
        className={`flex items-center my-1.5 w-100 px-5 rounded-xl h-20 hover:cursor-pointer justify-between items-center bg-white shadow-md`}
      >
        <div className="flex flex-row items-center basis-6/12">
          <img
            className={`rounded-full h-100 ${expanded ? `w-2/12` : `w-4/12`}`}
            src={profileImg}
          ></img>
          <div className="text-black font-bold text-2xl md:text-sm ml-5 leading-none">
            {username}
            <br />
            <span
              className={`${
                expanded ? `text-xs` : `text-[10px]`
              } text-dark-gray font-thin leading-3 align-top`}
            >
              wants to be your friend
            </span>
          </div>
        </div>
        <div
          className={`flex flex-row justify-between items-center w-100 ${
            expanded ? `basis-4/12` : `basis-6/12`
          }`}
        >
          <PrimaryButton clicked={acceptReq} text="Accept" />
          <SecondaryButton clicked={declineReq} text="Decline" />
        </div>
      </div>
    </>
  );
}

export default FriendRequestCard;
