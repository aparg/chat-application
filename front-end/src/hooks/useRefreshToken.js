//post request to refresh route and set auth as new access token received
import axios from "../api/axios";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const getNewToken = async () => {
    const response = await axios.post("/refresh", null, {
      withCredentials: true,
    });
    setAuth((prev) => ({ ...prev, accessToken: response.data.accessToken }));
    return accessToken;
  };
  return getNewToken;
};

export default useRefreshToken;
