import React, { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useUserRole from "../../../../hooks/useUserRole";
import AdminAnalytics from "./AdminAnalytics";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const { userRole, loading, error } = useUserRole();
  // console.log(userRole);

  if (!user) {
    return <p className="text-center text-gray-500">No user logged in.</p>;
  }

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading role: {error.message}</p>;

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={
              user.photoURL ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt="User avatar"
            className=""
          />
          <div className="text-center space-y-2 my-4">
            <h2 className="text-xl font-semibold">
              {user.displayName || "Unnamed User"}
            </h2>
            {userRole === "admin" && (
              <span className="text-sm text-white bg-blue-600 px-2 py-1 rounded-full capitalize">
                {userRole}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {user.email && (
            <p className="text-center">
              <strong>Email:</strong> {user.email}
            </p>
          )}
        </div>
      </div>
      <AdminAnalytics></AdminAnalytics>
    </>
  );
};

export default AdminProfile;
