import { useEffect, useState } from "react";
import { getDataRequest } from "../../utils/server-request-function/get-data-request";
import ChatUser from "./chat-user";

const ChatList = () => {
  const [chatUserList, setChatUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataRequest("/conversation/all");
        setChatUserList(() => [...data.payload]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-auto">
      {chatUserList.map((item, index) => (
        <ChatUser key={index} chatUser={item} />
      ))}
    </div>
  );
};

export default ChatList;
