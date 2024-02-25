import { useFormik } from "formik";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SET_USER } from "../constant/constant";
import { AuthContext } from "../providers/auth.provider";
import { sendPostRequest } from "../utils/server-request-function/send-post-request";

const validationSchema = Yup.object({
  emailOrUsername: Yup.string().required("Email or Username required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { dispatch } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  /* 
    react query
  */

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => sendPostRequest(data, "/customer-support/login"),
    onSuccess: async (data) => {
      dispatch({ type: SET_USER, payload: data.payload.customerSupport });

      navigate(from, { replace: true });
    },
  });

  /* 
    form filed with initial value 
  */
  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      const data = {
        ...values,
      };
      await mutateAsync(data);
    },
  });

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="emailOrUsername"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email or Username
            </label>
            <input
              type="emailOrUsername"
              id="emailOrUsername"
              name="emailOrUsername"
              placeholder="Enter your email/Username"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailOrUsername}
            />

            <div className="h-4">
              {formik.touched.emailOrUsername &&
                formik.errors.emailOrUsername && (
                  <div className="text-red-500 mt-9 sm:mt-1">
                    {formik.errors.emailOrUsername}
                  </div>
                )}{" "}
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
              placeholder="Enter your password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            <div className="h-4">
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 mt-9 sm:mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading && "cursor-not-allowed"
              }`}
              disabled={isLoading ? true : false}
            >
              Login
            </button>
          </div>

          {isError && error && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
