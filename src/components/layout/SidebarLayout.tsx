import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../layout/sidebar.css";
import { MdDashboard, MdBarChart, MdNotifications, MdTune } from "react-icons/md";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/app/dashboard", icon: <MdDashboard /> },
    { name: "History", path: "/app/history", icon: <MdBarChart /> },
    { name: "Alerts", path: "/app/alerts", icon: <MdNotifications /> },
    { name: "Control", path: "/app/control", icon: <MdTune /> },
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
