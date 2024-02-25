import ChatUser from "./chat-user";

const ChatList = () => {
  return (
    <div className="overflow-auto">
      {[1, 2, 3].map((item, index) => (
        <ChatUser key={index} />
      ))}
    </div>
  );
};

export default ChatList;
