import { useContext } from "react";
import ReceiverContext from "../context/ReceiverContext";

const useReceiverName = () => {
  return useContext(ReceiverContext);
};

export default useReceiverName;
