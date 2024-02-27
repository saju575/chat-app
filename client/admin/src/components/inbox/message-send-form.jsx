/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/auth.provider";
import { SocketContext } from "../../providers/socket.provider";
import { sendPostRequest } from "../../utils/server-request-function/send-post-request";

const MessageSendForm = ({ conversationId, receiverId, setMessages }) => {
  const [message, setMessage] = useState("");
  const { state } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const sendMessages = async (data, url) => {
    try {
      const res = await sendPostRequest(data, url);
      return res.payload;
    } catch (error) {
      //
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    console.log(message);

    const messageData = {
      conversationId,
      senderId: state?.user?._id,
      message: message,
      receiverId,
      receiverType: "User",
      senderType: "CustomerSupport",
    };
    setMessages((prev) => [...prev, messageData]);
    setMessage("");
    const data = await sendMessages(messageData, "/message/create");
    if (data) {
      socket.current.emit("send-message", data);
    }

    console.log(messageData);
  };
  return (
    <div className=" w-full p-3 border-t border-gray-300">
      <form onSubmit={handleSubmit}>
        <div className="relative w-full  px-4 mx-3 bg-gray-100  rounded-full">
          <input
            type="text"
            className="w-full block py-2 outline-none focus:text-gray-700 bg-gray-100"
            placeholder="Message"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageSendForm;
