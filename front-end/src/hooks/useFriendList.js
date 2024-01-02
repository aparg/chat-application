import { useContext } from "react";
import FriendsContext from "../context/FriendsContext";
const useFriendList = () => {
  return useContext(FriendsContext);
};

export default useFriendList;
