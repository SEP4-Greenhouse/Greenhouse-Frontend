import { NavLink, Outlet, useNavigate } from "react-router-dom";

const SidebarLayout = () => {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Control Panel", path: "/control" },
    { name: "History", path: "/history" },
    { name: "Machine Learning", path: "/machine-learning" },

  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col justify-between">
        {/* Logo section */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-green-700">Greenhouse</h1>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2 px-4 py-6 text-base text-gray-800">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-green-50 hover:text-green-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-md font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
