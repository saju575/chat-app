// import ChatLayout from "../components/inbox/chat-layout";
// import ChatList from "../components/inbox/chat-list";
// import MessageSendForm from "../components/inbox/message-send-form";

import { Outlet } from "react-router-dom";
import ChatList from "../components/inbox/chat-list";
import Logout from "../components/logout/logout";

const Inbox = () => {
  return (
    // <div>
    //   <div className="container mx-auto px-3">
    //     <div className="min-h-[90vh] border rounded flex lg:grid lg:grid-cols-3">
    //       <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
    //         <ChatList />
    //       </div>
    //       <div className="w-full lg:col-span-2 lg:block">
    //         <div className="w-full flex flex-col">
    //           <ChatLayout />

    //           <MessageSendForm />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="Chat">
    //   <div className="Left-side-chat bg-slate-500">
    //     <div className="Chat-container">
    //       <h2>Chats</h2>
    //       <div className="Chat-list"></div>
    //     </div>
    //   </div>

    //   <div className="Right-side-chat"></div>
    // </div>

    <div>
      <div className="bg-slate-50 py-2 flex justify-end">
        <Logout />
      </div>
      <div className="flex h-[93vh]">
        {/* left side */}
        <div className="w-[20%] px-2  overflow-y-auto">
          <h2 className="text-2xl font-medium ml-3 mb-7">Chats</h2>
          <ChatList />
        </div>

        {/* right side */}
        <div className="w-[80%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
