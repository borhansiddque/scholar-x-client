import { useContext, useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink } from "react-router";
import {
  MdAssignment,
  MdRateReview,
  MdAdminPanelSettings,
  MdPeople,
  MdAdd,
  MdSchool,
} from "react-icons/md";
import { FaRegListAlt, FaRegUser } from "react-icons/fa";
import logo from "/logo.png";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";

const navItems = {
  user: [
    { label: "My Profile", to: "/dashboard/profile", icon: <FaRegUser /> },
    {
      label: "My Application",
      to: "/dashboard/my-applications",
      icon: <MdAssignment />,
    },
    { label: "My Review", to: "/dashboard/my-reviews", icon: <MdRateReview /> },
  ],
  admin: [
    {
      label: "Admin Profile",
      to: "/dashboard/admin-profile",
      highlight: true,
      icon: <MdAdminPanelSettings />,
    },
    {
      label: "Manage Users",
      to: "/dashboard/manage-users",
      icon: <MdPeople />,
    },
    {
      label: "Manage Review",
      to: "/dashboard/all-reviews",
      icon: <MdRateReview />,
    },
    {
      label: "Manage Applied Application",
      to: "/dashboard/all-applied-scholarships",
      icon: <MdAssignment />,
    },
    {
      label: "Add Scholarship",
      to: "/dashboard/add-scholarship",
      icon: <MdAdd />,
    },
    {
      label: "Manage Scholarships",
      to: "/dashboard/manage-scholarships",
      icon: <MdSchool />,
    },
  ],
  moderator: [
    { label: "My Profile", to: "/dashboard/profile", icon: <FaRegUser /> },
    
    {
      label: "Add Scholarship",
      to: "/dashboard/add-scholarship",
      icon: <MdAdd />,
    },
    {
      label: "Manage Scholarships",
      to: "/dashboard/manage-scholarships",
      icon: <MdSchool />,
    },
    {
      label: "All Reviews",
      to: "/dashboard/all-reviews",
      icon: <MdRateReview />,
    },
    {
      label: "All Applications",
      to: "/dashboard/all-applied-scholarships",
      icon: <FaRegListAlt />,
    },
  ],
};

const Sidebar = () => {
  const [isActive, setIsActive] = useState(true);
  const { user, logoutUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  const handleToggle = () => setIsActive(!isActive);

  const handleLogout = () => {
    logoutUser()
      .then(() => toast.success("LogOut Successfully"))
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users?email=${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
        })
        .catch((err) => {
          console.error("Failed to fetch user role", err);
        });
    }
  }, [user]);

  const renderNavLinks = () => {
    if (!userRole) return null;

    const links = new Map();

    if (userRole === "admin") {
      navItems.admin.forEach((item) => links.set(item.to, item));
    }
    if (userRole === "moderator") {
      navItems.moderator.forEach((item) => links.set(item.to, item));
    }
    if (userRole === "user") {
      navItems.user.forEach((item) => links.set(item.to, item));
    }

    return Array.from(links.values()).map(({ label, to, highlight, icon }) => (
      <NavLink
        key={label}
        to={to}
        className={({ isActive }) =>
          `py-2 px-4 flex items-center gap-3 font-semibold rounded transition ${
            isActive ? "bg-blue-100" : "hover:bg-gray-200"
          } ${highlight && "bg-gray-100 text-black"}`
        }
      >
        {icon}
        {label}
      </NavLink>
    ));
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <img src={logo} alt="logo" className="w-14 h-14" />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Logo - Desktop */}
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-blue-100 mx-auto">
            <Link to="/">
              <img src={logo} alt="logo" className="w-14 h-14" />
            </Link>
          </div>

          {/* Logo - Mobile */}
          <div className="block cursor-pointer p-4 font-bold bg-blue-100 md:hidden">
            <Link to="/">
              <img src={logo} alt="logo" className="w-14 h-14 mx-auto" />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="flex flex-col gap-1">{renderNavLinks()}</nav>
          </div>
        </div>

        {/* Logout Button */}
        <div>
          <hr />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform cursor-pointer"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
