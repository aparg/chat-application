import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const usePrivateAxios = () => {
  const getNewToken = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        //if authorization header is not set, set token in header of request
        if (!config.headers.authorization) {
          console.log(auth);
          config.headers.authorization = `Bearer ${auth?.accessToken}`;
          console.log(config.headers.authorization);
        }
        return config;
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
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [getNewToken, auth]);

  return axiosPrivate;
};

export default usePrivateAxios;
