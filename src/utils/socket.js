import { io } from "socket.io-client";
import { BE_BASE_URL } from "./constants";

const createSocketConnection = () => {
  return io(BE_BASE_URL, { withCredentials: true });
};

export default createSocketConnection;
