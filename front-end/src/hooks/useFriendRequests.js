import { useContext } from "react";
import FriendRequestsContext from "../context/FriendRequestsContext";
const useFriendRequests = () => {
  return useContext(FriendRequestsContext);
};

export default useFriendRequests;
