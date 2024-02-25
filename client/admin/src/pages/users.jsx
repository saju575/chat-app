import { FaPlusCircle } from "react-icons/fa";
import UserList from "../components/user-list/user-list";
import { useState } from "react";
import CreateUserModal from "../components/create-user-modal/create-user-modal";

const Users = () => {
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
  const toggleCreateUserModal = () => {
    setIsOpenCreateUserModal(!isOpenCreateUserModal);
  };

  return (
    <div className="py-4 px-3">
      <div className="container mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-center">Manage Users</h2>
        </div>
        <div className="flex justify-center items-center my-4">
          <FaPlusCircle
            className="text-3xl cursor-pointer"
            onClick={toggleCreateUserModal}
          />
        </div>

        <UserList />
      </div>

      {isOpenCreateUserModal && (
        <CreateUserModal
          closeModal={toggleCreateUserModal}
          isOpen={isOpenCreateUserModal}
        />
      )}
    </div>
  );
};

export default Users;
