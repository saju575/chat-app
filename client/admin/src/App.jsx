import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Spinner from "./components/spinner/spinner";
import { AuthContext } from "./providers/auth.provider";
import { router } from "./route/router";

function App() {
  const { state } = useContext(AuthContext);

  return (
    <>
      {state?.isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
