import { useState, useEffect } from "react";
import AddFriendCard from "./AddFriendCard";
import { v4 as uuidv4 } from "uuid";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";
import useSuggestedFriends from "../../../../hooks/useSuggestedFriends";
import FriendRequestCard from "./FriendRequestCard";
import useMode from "../../../../hooks/useMode";
import useFriendRequests from "../../../../hooks/useFriendRequests";
import { socket } from "../../../../socket/socket";
import { MODES } from "../../../../../constants/modes";
export const AddFriends = ({ expandable = true }) => {
  //loads all friend requests and suggested friends values and passes it through context
  const privateAxios = usePrivateAxios();
  const { setSuggestedFriends, suggestedFriends } = useSuggestedFriends();
  const { setFriendRequests, friendRequests } = useFriendRequests();
  const { mode, setMode } = useMode();
  useEffect(() => {
    getFriendRequests();
    getSuggestedFriends();
    socket.on("friendRequest", (data) => {
      setFriendRequests((prevRequests) => {
        return [...prevRequests, data];
      });
    });
    return () => {
      socket.off("friendRequest");
    };
  }, []);

  const getSuggestedFriends = () => {
    privateAxios
      .post("/friends/get")
      .then((result) => {
        setSuggestedFriends(result?.data);
      })
      .catch((err) => {
        console.error("Couldn't fetch friend suggestions");
        console.log(err);
      });
  };

  const getFriendRequests = () => {
    console.log("REFRESHING..");
    privateAxios
      .post("/showFriendRequests")
      .then((result) => {
        console.log(result.data);
        setFriendRequests(result?.data);
      })
      .catch((err) => {
        console.error("Couldn't fetch friend requests");
        console.log(err);
      });
  };

  return (
    <div className="basis-2/12">
      {expandable && (
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-black font-bold text-2xl basis-3/5">
            Add Friends
          </h1>
          <div
            className="basis-2/5 cursor-pointer text-end text-dark-gray hover:text-black"
            onClick={() =>
              mode !== MODES.addFriends && setMode(MODES.addFriends)
            }
          >
            See More
          </div>
        </div>
      )}

      {console.log(friendRequests)}
      {friendRequests.length !== 0 ? (
        <FriendRequestCard
          username={friendRequests[0].username}
          profilePhoto={friendRequests[0].profilePhoto}
          refreshFriendList={getFriendRequests}
          expanded={false}
        />
      ) : (
        <AddFriendCard username={suggestedFriends[0]} />
      )}
    </div>
  );
};
