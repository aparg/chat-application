import React from "react";
import useReceiver from "../../../../hooks/useReceiver";
import { useState } from "react";

const CreateGroup = ({ joinRoom }) => {
  const { setReceiver } = useReceiver();
  const [name, setName] = useState();
  const submitData = (e) => {
    e.preventDefault();
    setReceiver({ username: name, profilePhoto: null, group: true });
    joinRoom({ groupname: name });
  };
  return (
    <div className="relative w-full h-full bg-black/[0.1] flex items-center justify-center">
      <form
        className="bg-dark-gray p-5 rounded-md animate-drop"
        onSubmit={submitData}
      >
        <label htmlFor="groupName" className="text-black">
          Enter Group Name
        </label>
        <br></br>
        <input
          type="text"
          id="groupName"
          className="bg-white text-black px-2"
          required={true}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <input
          type="submit"
          value="Create"
          className="bg-cream cursor-pointer rounded-md px-2 my-2"
        ></input>
      </form>
    </div>
  );
};

export default CreateGroup;
