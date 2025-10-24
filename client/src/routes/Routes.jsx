import { createBrowserRouter } from "react-router";
import Root from "../Root";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../dashboard/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import MyFoods from "../dashboard/MyFoods";
import Profile from "../dashboard/Profile";
import MyRequests from "../dashboard/MyRequests";
import Terms from "../pages/Tarms";
import Dashboard from "../dashboard/Dashboard";
import DHome from "../dashboard/DHome";
import DonationSuccessPage from "../pages/DonationSuccessPage";
import DonationFailCancelPage from "../pages/DonationFailCancelPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/", Component: Home },
      { path: "*", Component: Error },
      { path: "/about", Component: About },
      { path: "/available-foods", Component: AvailableFoods },
      { path: "/signin", Component: Login },
      { path: "/register", Component: Register },
      { path: "/terms", Component: Terms },
      { path: "/food/:id", element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },

      // =========================
      // Donation Success / Fail
      // =========================
      {
        path: "/donation-success",
        element: <DonationSuccessPage />
      },
      {
        path: "/donation-fail",
        element: <DonationFailCancelPage />
      },
      {
        path: "/donation-cancel",
        element: <DonationFailCancelPage />
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
