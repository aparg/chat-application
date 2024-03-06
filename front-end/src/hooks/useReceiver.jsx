import { useContext } from "react";
import ReceiverContext from "../context/ReceiverContext";

const useReceiver = () => {
  return useContext(ReceiverContext);
};

export default useReceiver;
