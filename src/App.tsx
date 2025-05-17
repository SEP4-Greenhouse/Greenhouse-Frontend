// src/App.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default App;
