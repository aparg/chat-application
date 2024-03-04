import React from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../Button/PrimaryButton";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (d) => {
    console.log(JSON.stringify(d));
  };
  return (
    <div className="bg-[#F0E1D0] w-full p-2 basis-2/6 items-center mt-5 rounded-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-3"
      >
        <div className="text-black font-bold text-2xl basis-3/5 w-5/6 mb-3">
          Change Password
        </div>
        <label className="flex w-5/6 my-0">
          <span className="basis-1/2  text-black">Old Password:</span>
          <input
            type="password"
            {...register("oldPassword")}
            className="bg-white rounded-md text-black px-2"
          ></input>
        </label>
        <br />
        <label className="flex w-5/6 my-0">
          <span className="basis-1/2  text-black">New Password:</span>
          <input
            type="password"
            {...register("newPassword")}
            className="bg-white rounded-md text-black px-2"
          ></input>
        </label>
        <br />
        <label className="flex w-5/6 my-0 mb-3">
          <span className="basis-1/2  text-black">Repeat New Password:</span>
          <input
            type="password"
            {...register("repeatNewPassword")}
            className="bg-white rounded-md text-black px-2"
          ></input>
        </label>
        <PrimaryButton text="Submit" />
      </form>
    </div>
  );
};

export default ChangePassword;
