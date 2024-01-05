import React from "react";
import AddFriendCard from "./AddFriendCard";

export const AddFriends = () => {
  const friendReqArray = ["ram", "hari", "laxman"];
  return (
    <div className="overflow-auto basis-2/12">
      {friendReqArray.map((data) => (
        <AddFriendCard name={data} />
      ))}
    </div>
  );
};
