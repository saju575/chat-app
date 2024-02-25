import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layout/main.layout";
import Login from "../pages/login";
import GustRoute from "./gust-route";
import PrivateRoute from "./private-route";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={
          <GustRoute>
            <Login />
          </GustRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
    </>
  )
);
