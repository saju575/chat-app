import ChatLayout from "../components/inbox/chat-layout";
import ChatList from "../components/inbox/chat-list";
import MessageSendForm from "../components/inbox/message-send-form";

const Inbox = () => {
  return (
    <div>
      <div className="container mx-auto px-3">
        <div className="min-h-[90vh] border rounded flex lg:grid lg:grid-cols-3">
          <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
            <ChatList />
          </div>
          <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full flex flex-col">
              <ChatLayout />

              <MessageSendForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
