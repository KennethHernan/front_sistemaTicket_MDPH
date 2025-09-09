// socket.js
import { io } from "socket.io-client";

const socket = io("http://192.168.2.189:5000", {
  transports: ["polling", "websocket"],
});

export default socket;