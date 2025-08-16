import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return <div>
    Hey {user?.displayName}! Welcome your Dashboard
  </div>;
};

export default DashboardHome;
