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
import NoticesFeed from "./pages/NoticeFeed";
import NoticeDetailsPage from "./pages/NoticeDetailsPage";
import OrganizationDashboardPage from "./pages/OrganizationDashboardPage";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginScreen /> },
      { path: "new-ad", element: <NoticeForm /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "organization-dashboard", element: <OrganizationDashboardPage /> },
      { path: "feed", element: <NoticesFeed /> },
      { path: "/notice/:id", element: <NoticeDetailsPage /> },
      { path: "profile", element: <ProfilePage />},
      { path: "admin", element: <AdminPage />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
