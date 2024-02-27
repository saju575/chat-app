/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { sendPostRequest } from "../../utils/server-request-function/send-post-request";
import ErrorMessage from "../error-message/error-message";

const validtionSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be 15 characters or less")
    .required("Name required*"),
  username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be 15 characters or less")
    .required("Username required*"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email required*"),
  password: Yup.string()
    .min(4, "Must be at least 4 characters")
    .required("Password required*"),
});

const CreateCustomerSupportModal = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createCustomerSupport,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => sendPostRequest(data, "/customer-support/create"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validtionSchema,
    onSubmit: async (values) => {
      try {
        await createCustomerSupport(values);
        queryClient.invalidateQueries("customerSupports");
        closeModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-gray-100 max-h-screen flex justify-center items-center">
      {/* <!-- Backdrop --> */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-50"></div>

      {/* <!-- Modal --> */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg z-50 w-[400px]">
        {/* <!-- Close Button --> */}
        <div className="">
          <div className="flex justify-end">
            <IoMdClose
              className="text-2xl cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <h1 className="text-xl  mb-4">Create New Customer Support</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

              <div className="h-4">
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <div className="h-4">
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />

              <div className="h-4">
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              <div className="h-4">
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Create"}
              </button>
            </div>

            <div className="h-5 mt-2">
              {isError && <ErrorMessage message={error.message} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomerSupportModal;
