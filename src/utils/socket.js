import { io } from "socket.io-client";
import { BE_BASE_URL } from "./constants";

const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BE_BASE_URL, { withCredentials: true });
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};

export default createSocketConnection;
