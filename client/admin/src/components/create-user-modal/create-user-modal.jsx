/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";

const CreateUserModal = ({ closeModal }) => {
  return (
    <div className="bg-gray-100 max-h-screen flex justify-center items-center">
      {/* <!-- Backdrop --> */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-50"></div>

      {/* <!-- Modal --> */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg z-50">
        {/* <!-- Close Button --> */}
        <div className="flex justify-end">
          <IoMdClose className="text-2xl cursor-pointer" onClick={closeModal} />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Create New User</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
