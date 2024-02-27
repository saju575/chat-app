import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import CreateCustomerSupportModal from "../components/create-customer-support-modal/create-customer-support-modal";
import CustomerSupportList from "../components/customer-support-list/customer-support-list";
import Logout from "../components/logout/logout";

const CustomerSupport = () => {
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
  const toggleCreateUserModal = () => {
    setIsOpenCreateUserModal(!isOpenCreateUserModal);
  };

  return (
    <div className="py-4 px-3">
      <div className="container mx-auto">
        <div>
          <h2 className="text-2xl font-medium text-center">
            Manage Customer Support
          </h2>
        </div>
        <div className="flex justify-center items-center gap-3 my-4">
          <FaPlusCircle
            className="text-3xl cursor-pointer"
            onClick={toggleCreateUserModal}
          />

          <Logout />
        </div>

        <CustomerSupportList />
      </div>

      {isOpenCreateUserModal && (
        <CreateCustomerSupportModal
          closeModal={toggleCreateUserModal}
          isOpen={isOpenCreateUserModal}
        />
      )}
    </div>
  );
};

export default CustomerSupport;
