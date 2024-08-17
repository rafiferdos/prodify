import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import Main from "./layouts/Main";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home";
import Register from "./pages/Authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div className="flex items-center justify-center h-screen">404 | Not Found</div>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Home /></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);