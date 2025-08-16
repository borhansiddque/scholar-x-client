import React from "react";
import { FaLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import logo from "/logo.png";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="text-center p-6">
        <div className="bg-blue-100 p-4 rounded-full w-24 h-24 mx-auto">
          <img src={logo} alt="Logo" className="w-full h-full" />
        </div>
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <p className="text-3xl mt-4 text-base-content">Oops! Page not found.</p>
        <p className="mt-2 text-sm text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Home Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn border-none bg-gray-300 hover:bg-gray-400 mt-6 text-black shadow-none hover:shadow-md transition-all duration-300 mr-4"
        >
          <FaLeftLong />
          Go Back
        </button>
        <Link
          to="/"
          className="btn border-none bg-blue-500 hover:bg-blue-600 mt-6 text-white shadow-none hover:shadow-md hover:shadow-blue-600 transition-all duration-300"
        >
          <FaHome />
          Back to Home
        </Link>

        {/* Go Back Button */}
      </div>
    </div>
  );
};

export default ErrorPage;
