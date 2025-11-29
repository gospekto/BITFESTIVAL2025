import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import LoginScreen from "./pages/LoginScreen";

import "./index.css";
import HomePage from "./pages/HomePage";
import NoticeForm from "./components/NoticeForm";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginScreen /> },
      { path: "test", element: <NoticeForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
