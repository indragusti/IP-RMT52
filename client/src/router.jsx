import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import Detail from "./pages/DetailPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/monster/:id",
    element: <Detail />,
  },
]);
