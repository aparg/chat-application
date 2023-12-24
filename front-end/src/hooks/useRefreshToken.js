import React from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";
const getNewToken = async () => {
  const { setAuth } = useAuth();
  const response = await axios.post("/refresh", null, {
    withCredentials: true,
  });
  setAuth((prev) => ({ ...prev, accessToken: response.data.accessToken }));
  return accessToken;
};

export default getNewToken;
