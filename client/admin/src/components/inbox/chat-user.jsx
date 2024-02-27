import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ChatUser = ({ chatUser }) => {
  const { _id, creatorId } = chatUser || {};
  return (
    <Link
      to={`/customer-support/chat/${_id}/${creatorId?._id}`}
      className="flex items-center px-3 py-4 hover:bg-slate-50 hover:rounded text-sm transition duration-150 ease-in-out  cursor-pointer focus:outline-none"
    >
      <img
        className="object-cover w-10 h-10 rounded-full"
        src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
        alt="username"
      />
      <div className="w-full pb-2 hidden md:block">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {creatorId?.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ChatUser;
