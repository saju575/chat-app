/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./auth.provider";

export const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { state } = useContext(AuthContext);
  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:5000");
  }, []);

  useEffect(() => {
    if (state?.user && state?.user?.role === "customerSupport") {
      socket.current.emit("add-customer-support", { id: state?.user?._id });
    }
  }, [state?.user]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
