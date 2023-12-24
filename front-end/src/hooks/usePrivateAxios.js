import { useEffect } from "react";
import axios, { axiosPrivate } from "../api/axios";
import getNewToken from "./useRefreshToken";
import useAuth from "./useAuth";

const usePrivateAxios = () => {
  const newToken = getNewToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        //if authorization header is not set
        if (!config.headers.authorization) {
          config.headers.authorization = `Bearer ${auth?.accessToken}`;
        }
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      //if everything is okay and response is returned, response is sent as it is
      (response) => response,
      //if there is an error, it is assumed that the access token has expired and a new access token is required to get access
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.oldReq) {
          prevRequest.oldReq = true;
          //set oldReq to true so that if forbidden is returned once again, new access token is not fetched
          const newAccessToken = await getNewToken();
          prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return err;
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [newToken, auth]);

  return axiosPrivate;
};

export default usePrivateAxios;
