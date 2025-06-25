import { createBrowserRouter } from "react-router";
import Root from "../Root";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import MyFoods from "../pages/MyFoods";
import Profile from "../pages/Profile";
import MyRequests from "../pages/MyRequests";
import Terms from "../pages/Tarms";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "*",
        Component: Error,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path : "/available-foods",
        Component: AvailableFoods,
      },
      {
        path : "/signin",
        Component: Login
      },
      {
        path : "/register",
        Component: Register
      },
      {
        path : "/terms",
        Component: Terms
      },
      {
        path : "/about",
        Component: About
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      }
    ],
  },
]);
