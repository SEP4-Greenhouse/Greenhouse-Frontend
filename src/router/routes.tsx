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
import PostLoginPage from "../features/greenhouseSetup/PostLoginPage";
import CreateGreenhousePage from "../features/greenhouseSetup/CreateGreenhousePage";
import Account from "../pages/Account";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Welcome /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "post-login", element: <PostLoginPage /> },
        { path: "create-greenhouse", element: <CreateGreenhousePage /> },


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
            {path: "account", element: <Account />},
          ],
        },
      ],
    },
  ],
  {
    basename: "/Greenhouse-Frontend/", 
  }
);

export default router;
