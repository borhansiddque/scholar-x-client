import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import logo from "/logo.png";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import useUserRole from "../hooks/useUserRole";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { userRole } = useUserRole();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("LogOut Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive ? "text-blue-500" : "text-gray-600"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/scholarships"}
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive ? "text-blue-500" : "text-gray-600"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to={
              userRole === "admin"
                ? "/dashboard/admin-profile"
                : "/dashboard/profile"
            }
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? "text-blue-500" : "text-gray-600"
              }`
            }
          >
            {userRole === "admin" && "Admin Dashboard"}
            {userRole === "moderator" && "Moderator Dashboard"}
            {userRole === "user" && "User Dashboard"}
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive ? "text-blue-500" : "text-gray-600"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="bg-white/90 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start gap-5 lg:gap-0">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="h-10 w-10 rounded-full bg-blue-500 lg:hidden flex items-center justify-center text-white"
            >
              <BiMenu size={30}></BiMenu>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <img src={logo} alt="" className="w-14" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-blue-500"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile Picture"
                    src={user && user.photoURL}
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src =
                        "https://img.icons8.com/?size=100&id=23265&format=png";
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow border-2 border-blue-500"
              >
                <li className="text-xl text-center font-semibold mb-2">
                  {user.displayName}
                </li>
                <li>
                  <Link
                    to={
                      userRole === "admin"
                        ? "/dashboard/admin-profile"
                        : "/dashboard/profile"
                    }
                    className="btn text-base bg-blue-500 hover:bg-blue-600 text-white px-6 transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="btn text-base bg-blue-500 hover:bg-blue-600 text-white px-6 transition-all duration-300"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn border-none bg-blue-500 hover:bg-blue-600 text-white px-6 transition-all duration-300 shadow-none hover:shadow-md hover:shadow-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
