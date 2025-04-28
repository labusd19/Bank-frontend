import { useState, useEffect } from "react";
import { FaEuroSign } from "react-icons/fa";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <nav className="w-full py-4 flex justify-between items-center bg-white fixed top-0 left-0 right-0 z-50">
      <a href="/home">
        <div className="flex items-center space-x-2">
          <FaEuroSign className="text-3xl text-indigo-500" />{" "}
          <span className="font-semibold text-xl text-gray-800">MyBank</span>{" "}
        </div>
      </a>

      <FaEuroSign />

      {isAuthenticated && (
        <ul className="hidden lg:flex flex-grow items-center justify-center space-x-10 mr-10">
          <li>
            <a
              href="/home"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/transfer-money"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              Transfer money
            </a>
          </li>
        </ul>
      )}
      <div className="mt-auto mr-3 flex">
        {!isAuthenticated ? (
          <>
            <a
              className="block px-4 py-3 mr-2 mb-2 leading-loose text-xs text-center font-semibold bg-gray-200 hover:bg-gray-100 rounded-xl"
              href="/login"
            >
              Sign in
            </a>
            <a
              className="block !text-white px-4 py-3 mb-2 mr-2 leading-loose text-xs text-center font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
              href="/register"
            >
              Sign Up
            </a>
          </>
        ) : (
          <a
            className="block !text-white px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
            onClick={handleLogout}
          >
            Logout
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
