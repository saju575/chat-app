import { useContext } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useMutation } from "react-query";
import { SET_USER } from "../../constant/constant";
import { AuthContext } from "../../providers/auth.provider";
import { sendPostRequest } from "../../utils/server-request-function/send-post-request";

const Logout = () => {
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
    <span
      className={`flex items-center cursor-pointer border bg-slate-400 px-1 py-1 rounded-2xl ${
        isLoading && "cursor-not-allowed"
      }`}
      onClick={async () => await logout()}
    >
      <i className="pr-1 text-2xl">
        <TbLogout2 />
      </i>
      {isLoading ? "Loading" : "Log Out"}
    </span>
  );
};

export default Logout;
