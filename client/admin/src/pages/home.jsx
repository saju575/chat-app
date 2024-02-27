import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/auth.provider";

const Home = () => {
  const { state } = useContext(AuthContext);

  console.log(state);

  if (state?.user?.role === "admin") {
    return <Navigate to="/admin" />;
  } else if (state?.user?.role === "customerSupport") {
    return <Navigate to="/customer-support" />;
  }
  return null;
};

export default Home;
