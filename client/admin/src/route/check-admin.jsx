/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import { AuthContext } from "../providers/auth.provider";

const CheckAdmin = ({ children }) => {
  const { state } = useContext(AuthContext);
  const location = useLocation();

  if (state?.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!state?.isLoading && state?.user && state?.user?.role === "admin") {
    return children;
  }
  if (!state.isLoading && state.user?.role !== "admin") {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
};

export default CheckAdmin;
