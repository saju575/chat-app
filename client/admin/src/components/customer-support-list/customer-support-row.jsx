/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";

const CustomerSupportRow = ({ row }) => {
  const { name, email, username } = row || {};
  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{username}</td>
      <td className="border px-4 py-2">
        <FaTrashAlt />
      </td>
    </tr>
  );
};

export default CustomerSupportRow;
