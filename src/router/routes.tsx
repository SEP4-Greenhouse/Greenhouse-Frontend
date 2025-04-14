import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // wraps everything in AuthProvider
import Welcome from "../pages/Welcome";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import SidebarLayout from "../components/layout/SidebarLayout";
import Dashboard from "../components/dashboard/Dashboard";
import ControlPanel from "../features/control/GreenhouseControl";
import History from "../features/history/History";
import Alerts from "../features/alerts/Alerts";
import MachineLearning from "../features/machine-learning/MachineLearning";
import ProtectedRoute from "./ProtectedRoute"; // ✅ your auth guard

const router = createBrowserRouter([
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
          { path: "machine-learning", element: <MachineLearning /> },
        ],
      },
    ],
  },
]);

export default router;
