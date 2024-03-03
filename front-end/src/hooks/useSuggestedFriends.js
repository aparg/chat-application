import { useContext } from "react";
import SuggestedFriendsContext from "../context/SuggestedFriendsContext";
const useSuggestedFriends = () => {
  return useContext(SuggestedFriendsContext);
};

export default useSuggestedFriends;
