import React from "react";
import { useState } from "react";
import profileImg from "../../assets/images/profile.jpg";
import cameraIcon from "../../assets/images/icons/camera.png";
import useAuth from "../../hooks/useAuth";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const EditProfileImg = () => {
  const { auth, setAuth } = useAuth();
  const privateAxios = usePrivateAxios();
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const imgBase64 = await getBase64(file);
    await privateAxios.post("/editProfile/saveProfilePhoto", { imgBase64 });
    setAuth({ ...auth, profilePhoto: imgBase64 });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <div className="flex flex-col items-center p-8 basis-1/2">
        <div className="relative w-40 h-40">
          <img
            src={auth.profilePhoto || profileImg}
            className="w-full h-full rounded-full clip-circle"
          ></img>
          <h1 className="text-dark-gray font-bold text-2xl basis-3/5 text-center">
            @{auth.name}
          </h1>
          <div className="absolute bottom-2 right-3 w-[30px] bg-dark-gray p-1 rounded-full cursor-pointer hover:border-2 hover:border-lime-700 ">
            <label htmlFor="profilePicture">
              <img src={cameraIcon} className="cursor-pointer rounded-full" />
            </label>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              id="profilePicture"
              className="hidden"
              onChange={(e) => handleImgUpload(e)}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileImg;
