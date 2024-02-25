import { Fragment } from "react";

const ChatLayout = () => {
  return (
    <>
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          alt="username"
        />
        <span className="block ml-2 font-bold text-gray-600">Emma</span>
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>
      <div className="relative w-full h-[75vh] p-6 overflow-y-auto">
        <ul className="space-y-2">
          {[1, 2].map((item) => (
            <Fragment key={item}>
              <li className="flex justify-start">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span className="block">Hi</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">Hiiii</span>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatLayout;
