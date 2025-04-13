import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../layout/sidebar.css";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "History", path: "/history", icon: "bar_chart" },
    { name: "Alerts", path: "/alerts", icon: "notifications" },
    { name: "Control", path: "/controlpanel", icon: "tune" },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app-layout">
      <aside className={`sidebar ${isSidebarVisible ? "showSidebar" : "hideSidebar"}`}>
        <div className="sidebar-header">
          <img src="/logo-removebg-preview.png" alt="Greenhouse" className="logo" />
        </div>
        <ul>
          {menu.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                <span className="material-icons menu-icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <button className="logout-button" onClick={() => navigate("/login")}>Log out</button>
      </aside>

      <main className="main-content">
        <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
