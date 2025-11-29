import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import LoginScreen from "./pages/LoginScreen";
import ProfilePage from "./pages/ProfilePage";

import "./index.css";
import HomePage from "./pages/HomePage";
import NoticeForm from "./components/NoticeForm";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import Processor_ from "postcss/lib/processor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginScreen /> },
      { path: "test", element: <NoticeForm /> },
      { path: "dashboard", element: <DashboardPage /> },
      {path: "profile", element: <ProfilePage />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
