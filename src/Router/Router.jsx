import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AllScholarships from "../Pages/AllScholarships/AllScholarships";
import AboutUs from "../Pages/AboutUs/AboutUs";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddScholarshipForm from "../Pages/Dashboard/AddScholarship/AddScholarshipForm";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import Profile from "../Pages/Dashboard/Profile/Profile";
import ManageScholarships from "../Pages/Dashboard/ManageScholarships/ManageScholarships";
import ApplyScholarship from "../Pages/ApplyScholarship/ApplyScholarship";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import MyApplications from "../Pages/Dashboard/MyApplications/MyApplications";
import AllAppliedScholarships from "../Pages/Dashboard/AllAppliedScholarships/AllAppliedScholarships";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";
import AdminProfile from "../Pages/Dashboard/Profile/Admin/AdminProfile";

let router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/scholarships",
        Component: AllScholarships,
      },
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/apply-scholarship/:id",
        element: (
          <PrivateRoute>
            <ApplyScholarship></ApplyScholarship>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <AdminProfile></AdminProfile>
          </PrivateRoute>
        ), // Admin Profile
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ), // User & Moderator Profile
      },
      {
        path: "add-scholarship",
        element: (
          <PrivateRoute>
            <AddScholarshipForm></AddScholarshipForm>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <PrivateRoute>
            <ManageScholarships></ManageScholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "all-applied-scholarships",
        element: (
          <PrivateRoute>
            <AllAppliedScholarships></AllAppliedScholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <PrivateRoute>
            <AllReviews></AllReviews>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
