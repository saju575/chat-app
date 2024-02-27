import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layout/main.layout";
import Home from "../pages/home";
import Inbox from "../pages/inbox";
import Login from "../pages/login";

import CustomerSupport from "../pages/customer-support";
import CheckAdmin from "./check-admin";
import CheckCustomerSupport from "./check-customer-support";
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
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <CheckAdmin>
              <CustomerSupport />
            </CheckAdmin>
          }
        />

        <Route
          path="/customer-support"
          element={
            <CheckCustomerSupport>
              <Inbox />
            </CheckCustomerSupport>
          }
        />
      </Route>
    </>
  )
);
