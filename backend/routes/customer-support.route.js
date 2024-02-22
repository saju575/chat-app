const express = require("express");
const {
  createCustomerSupport,
  getAllCustomerSupport,
  getCustomerSupportById,
  login,
  logout,
  getCustomerSupportProfilee,
} = require("../controllers/customer-support/customer-support.controller");
const {
  isAuthenticated,
  authorizeRole,
} = require("../middlewares/auth.middleware");

const customerSupportRouter = express.Router();

/* create customer support */
customerSupportRouter.post(
  "/create",
  isAuthenticated,
  authorizeRole("admin"),
  createCustomerSupport
); // need to add middleware [only admin can create customer support]

/* get all customer support */
customerSupportRouter.get("/all", getAllCustomerSupport);

/* get customer support by id */
customerSupportRouter.get("/:customerSupportId", getCustomerSupportById);

/* login  */
customerSupportRouter.post("/login", login);

/* logout */
customerSupportRouter.post("/logout", logout);

/* get user profile */
customerSupportRouter.get(
  "/agent/profile",
  isAuthenticated,
  getCustomerSupportProfilee
);

module.exports = customerSupportRouter;
