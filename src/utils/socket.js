import { io } from "socket.io-client";
import { BE_BASE_URL } from "./constants";

const createSocketConnection = () => {
  return io(BE_BASE_URL);
};

export default createSocketConnection;
