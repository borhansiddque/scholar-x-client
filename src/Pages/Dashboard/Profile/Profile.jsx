import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUserRole from "../../../hooks/useUserRole";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { userRole, loading, error } = useUserRole();

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading role: {error.message}</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">My Profile</h2>
      <img
        src={user?.photoURL}
        alt="User"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <div className="flex justify-center mt-4">
        {userRole === "moderator" && (
          <span className="text-sm text-white bg-blue-600 px-2 py-1 rounded-full capitalize">
            {userRole}
          </span>
        )}
      </div>
      <h3 className="text-center mt-2 text-lg font-semibold">
        {user?.displayName}
      </h3>
      <p className="text-center text-gray-500">{user?.email}</p>
    </div>
  );
};

export default Profile;
