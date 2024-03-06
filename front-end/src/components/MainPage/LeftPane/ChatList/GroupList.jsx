import { useState } from "react";
import addIcon from "../../../../assets/images/icons/add-icon.png";

const GroupList = () => {
  const [popUp, setPopUp] = useState(null);
  return (
    <div className="relative flex flex-col w-full h-full items-center">
      {popUp && (
        <div className="relative w-full h-full bg-black/[0.1] flex items-center justify-center">
          <form className="bg-dark-gray p-5 rounded-md animate-drop">
            <label htmlFor="groupName" className="text-black">
              Enter Group Name
            </label>
            <br></br>
            <input
              type="text"
              id="groupName"
              className="bg-white text-black px-2"
            ></input>
          </form>
        </div>
      )}
      <img
        className="absolute bottom-0 cursor-pointer w-1/12"
        onClick={() => setPopUp(!popUp)}
        src={addIcon}
      ></img>
    </div>
  );
};

export default GroupList;
