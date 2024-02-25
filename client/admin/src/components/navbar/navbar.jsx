import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-center items-center">
        <a href="#" className="mx-2">
          Users
        </a>
        <Link to={"/"} className="mx-2">
          Inbox
        </Link>
        <a href="#" className="mx-2">
          Clients
        </a>
        <span className="mx-2">|</span>
        <a href="#" className="mx-2">
          Logout
        </a>
        <Link to={"/login"} className="mx-2">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
