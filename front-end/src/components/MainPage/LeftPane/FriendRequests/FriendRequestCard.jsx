import React from "react";
import profileImg from "../../../../assets/images/profile.jpg";

function FriendRequestCard({ username }) {
  const acceptReq = () => {};

  const declineReq = () => {};
  return (
    <>
      <div
        className={`flex items-center my-1.5 w-full rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer justify-center 
      }`}
      >
        <img className="rounded-full w-1/6 basis-1/6" src={profileImg}></img>
        {/* <div className="flex items-center justify-left "> */}
        <div className="flex-col">
          <div className="text-black font-bold text-2xl md:text-sm basis-2/6 w-full text-center">
            {username}
          </div>
          <div className="flex justify-between">
            <button className="bg-gray basis-2/6 w-full" onClick={acceptReq}>
              Accept!
            </button>
            <button className="bg-gray basis-2/6 w-full" onClick={declineReq}>
              Decline!
            </button>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default FriendRequestCard;
