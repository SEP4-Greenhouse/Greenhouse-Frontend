import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // ✅ App wraps all routes with AuthProvider
import Welcome from "../pages/Welcome";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import SidebarLayout from "../components/layout/SidebarLayout";
import Dashboard from "../features/dashboard/Dashboard";
import ControlPanel from "../features/control/ControlPanel";
import History from "../features/history/History";
import Alerts from "../features/alerts/Alerts";
import MachineLearning from "../features/machine-learning/MachineLearning";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // wraps with <AuthProvider>
    children: [
      { path: "", element: <Welcome /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "app",
        element: <SidebarLayout />,
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
