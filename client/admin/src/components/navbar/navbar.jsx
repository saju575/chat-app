import { useContext } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { SET_USER } from "../../constant/constant";
import { AuthContext } from "../../providers/auth.provider";
import { sendPostRequest } from "../../utils/server-request-function/send-post-request";

const Navbar = () => {
  /*to set user  */
  const { dispatch } = useContext(AuthContext);

  /* react query */
  const { mutateAsync: logout, isLoading } = useMutation({
    mutationFn: () => sendPostRequest({}, "/customer-support/logout"),
    onSuccess: async () => {
      dispatch({ type: SET_USER, payload: null });
    },
  });

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-center items-center">
        <a href="#" className="mx-2">
          Users
        </a>
        <Link to={"/"} className="mx-2">
          Inbox
        </Link>
        <a href="#" className="mx-2">
          Clients
        </a>
        <span className="mx-2">|</span>
        <span
          className={`flex items-center cursor-pointer ${
            isLoading && "cursor-not-allowed"
          }`}
          onClick={async () => await logout()}
        >
          <i className="pr-2 text-2xl">
            <TbLogout2 />
          </i>
          {isLoading ? "Loading" : "Log Out"}
        </span>
        {/* <Link to={"/login"} className="mx-2">
          Login
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
