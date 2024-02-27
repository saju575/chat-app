/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/auth.provider";
import { SocketContext } from "../../providers/socket.provider";
import { getDataRequest } from "../../utils/server-request-function/get-data-request";
import MessageSendForm from "./message-send-form";

const ChatBody = ({ conversationId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const scroll = useRef();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getDataRequest(`/message/all/${conversationId}`);
        setMessages(() => [...data.payload]);
      } catch (error) {
        // console.log(error)
      }
    };
    fetchMessages();
  }, [conversationId]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current.on("get-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  return (
    <>
      <div className="chat-body h-[75vh]">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={scroll}
            className={
              message.senderId === state?.user?._id ? "message own" : "message"
            }
          >
            <span>{message.message}</span>{" "}
            {/* <span>{format(message.createdAt)}</span> */}
          </div>
        ))}
      </div>

      <MessageSendForm
        conversationId={conversationId}
        receiverId={receiverId}
        setMessages={setMessages}
      />
    </>
  );
};

export default ChatBody;
