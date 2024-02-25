import { FaTrashAlt } from "react-icons/fa";

const UserRow = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        Support User 1
      </th>
      <td className="px-6 py-4">supportuser@example.com</td>
      <td className="px-6 py-4">
        <FaTrashAlt />
      </td>
    </tr>
  );
};

export default UserRow;
