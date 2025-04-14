// src/pages/Welcome.tsx
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <div className="welcome-container">
        <h1>🌱 Welcome to Greenhouse</h1>
        <p>Monitor, control, and automate your greenhouse.</p>
        <div className="welcome-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};


export default Welcome;
