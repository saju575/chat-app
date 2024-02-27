/* eslint-disable react/prop-types */
const ErrorMessage = ({ message = "" }) => {
  return (
    <div className="text-center w-full px-2 py-1 bg-red-300 text-red-600 rounded-sm">
      {message}
    </div>
  );
};

export default ErrorMessage;
