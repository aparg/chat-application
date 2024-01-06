import React from "react";
import AddFriendCard from "./AddFriendCard";
import { v4 as uuidv4 } from "uuid";
export const AddFriends = () => {
  const friendReqArray = ["ram", "hari", "laxman"];
  return (
    <div className="overflow-auto basis-2/12">
      {friendReqArray.map((data) => (
        <AddFriendCard name={data} key={uuidv4()} />
      ))}
    </div>
  );
};
