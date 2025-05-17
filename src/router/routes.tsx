import { createBrowserRouter } from "react-router-dom";
import App from "../App"; 
import Welcome from "../pages/Welcome";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import SidebarLayout from "../components/layout/SidebarLayout";
import Dashboard from "../components/dashboard/Dashboard";
import ControlPanel from "../features/control/GreenhouseControl";
import History from "../features/history/History";
import Alerts from "../features/alerts/Alerts";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Welcome /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "app",
          element: (
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "control", element: <ControlPanel /> },
            { path: "history", element: <History /> },
            { path: "alerts", element: <Alerts /> },
          ],
        },
      ],
    },
  ],
  {
    basename: "/", // always use root base path for our current deployment
  }
);

export default router;
