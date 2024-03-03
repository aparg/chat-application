import { useState } from "react";
import AddFriendCard from "../../LeftPane/AddFriends/AddFriendCard";
import { v4 as uuidv4 } from "uuid";
import useSuggestedFriends from "../../../../hooks/useSuggestedFriends";
import useFriendRequests from "../../../../hooks/useFriendRequests";
import FriendRequestCard from "../../LeftPane/AddFriends/FriendRequestCard";
export const AddFriendsSection = () => {
  const { friendRequests, setFriendRequests } = useFriendRequests();
  const { suggestedFriends } = useSuggestedFriends();

  const getFriendRequests = () => {
    console.log("REFRESHING..");
    privateAxios
      .post("/showFriendRequests")
      .then((result) => {
        setFriendRequests(result?.data);
      })
      .catch((err) => {
        console.error("Couldn't fetch friend requests");
        console.log(err);
      });
  };
  return (
    <div className="overflow-auto w-full h-full py-5 px-5">
      {friendRequests.map((data) => (
        <FriendRequestCard
          username={data}
          refreshFriendList={getFriendRequests}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};
