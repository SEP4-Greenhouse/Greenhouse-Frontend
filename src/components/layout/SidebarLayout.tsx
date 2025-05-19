import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../layout/sidebar.css";
import { MdDashboard, MdBarChart, MdNotifications, MdTune, MdAccountBox } from "react-icons/md";

/** Hook to detect mobile screen width */
const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const SidebarLayout = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const isMobile = useIsMobile();

  const menu = [
    { name: "Dashboard", path: "/app/dashboard", icon: <MdDashboard /> },
    { name: "History", path: "/app/history", icon: <MdBarChart /> },
    { name: "Alerts", path: "/app/alerts", icon: <MdNotifications /> },
    { name: "Control", path: "/app/control", icon: <MdTune /> },
    { name: "Manage Account", path: "/app/account", icon: <MdAccountBox /> }
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app-layout">
      {isMobile ? (
        <>
          {/* Mobile Header */}
          <header className="mobile-header">
            <button className="hamburger" onClick={toggleSidebar}>☰</button>
            <img src="/logo-removebg-preview.png" alt="Greenhouse" className="mobile-logo" />
          </header>

          {/* Mobile Dropdown Menu */}
          <nav className={`mobile-menu ${isSidebarVisible ? "show" : "hide"}`}>
            <ul>
              {menu.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                      setIsSidebarVisible(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button className="logout-button" onClick={() => navigate("/login")}>Log out</button>
          </nav>
        </>
      ) : (
        <aside className="sidebar showSidebar">
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
      )}

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
