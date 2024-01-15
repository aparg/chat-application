import { io } from "socket.io-client";

const URL = import.meta.env.PORT || "http://localhost:3500/";
export const socket = io(URL);
