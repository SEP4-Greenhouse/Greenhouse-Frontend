// src/App.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext"; // ✅ Ensure path is correct

console.log("Token fixed");




const App = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default App;
