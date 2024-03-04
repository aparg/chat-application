import React from "react";
import EditProfileImg from "./EditProfileImg";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  return (
    <div className="px-5 w-full h-full flex flex-col">
      <EditProfileImg />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
