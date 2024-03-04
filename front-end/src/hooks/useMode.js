import { useContext } from "react";
import ModeContext from "../context/ModeContext";

const useMode = () => {
  return useContext(ModeContext);
};

export default useMode;
