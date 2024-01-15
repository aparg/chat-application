import { useState } from "react";
import AddFriendCard from "./AddFriendCard";
import { v4 as uuidv4 } from "uuid";
export const AddFriends = () => {
  const [friendReqArray, setFriendReqArray] = useState([]);
  const suggestedFriends = ["apar", "ramrijal"];
  return (
    <div className="overflow-auto basis-2/12">
      {suggestedFriends.map((data) => (
        <AddFriendCard username={data} key={uuidv4()} />
      ))}
    </div>
  );
};
