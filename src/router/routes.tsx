import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";
import Dashboard from "../features/dashboard/Dashboard";
import ControlPanel from "../features/control/ControlPanel";
import History from "../features/history/History";
import Alerts from "../features/alerts/Alerts";
import Login from "../features/auth/Login";
import MachineLearning from "../features/machine-learning/MachineLearning";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "control", element: <ControlPanel /> },
      { path: "history", element: <History /> },
      { path: "alerts", element: <Alerts /> },
      {
        path: "machine-learning",
        element: <MachineLearning />,
      },
    ],
  },
]);

export default router;
