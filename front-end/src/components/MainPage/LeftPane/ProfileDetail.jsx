import React from "react";
import { MODES } from "../../../../constants/modes";
import useMode from "../../../hooks/useMode";
import useAuth from "../../../hooks/useAuth";
import profileImg from "../../../assets/images/profile.jpg";

const ProfileDetail = () => {
  const { auth } = useAuth();
  const { mode, setMode } = useMode();
  return (
    <section className="flex flex-row basis-2/12 items-center">
      <img
        src={auth.profilePhoto || profileImg}
        className="rounded-full border-dark-brown border-2 shadow-gray flex-none w-1/5 clip-circle"
      ></img>
      <div className="text-brown-text font-light flex-auto px-5">
        @{auth.name}
      </div>
      <div
        className="cursor-pointer text-end text-dark-gray hover:text-black"
        onClick={() => {
          mode !== MODES.editProfile && setMode(MODES.editProfile);
        }}
      >
        Edit Profile
      </div>
    </section>
  );
};

export default ProfileDetail;
