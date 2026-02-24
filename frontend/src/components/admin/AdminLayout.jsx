import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/requests", label: "Requests" },
    { path: "/admin/individual", label: "Individual Inquiries" },
    { path: "/admin/organization", label: "Organization Inquiries" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/bookings", label: "Bookings" },
    { path: "/admin/availability", label: "Availability" },
    { path: "/admin/newsletters", label: "Newsletter" },

  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className="w-64 p-6 flex flex-col"
        style={{ 
          backgroundColor: "#194C63",
          color: "#F5FAFD"
        }}
      >
        <div className="mb-8">
          <h2 
            className="text-xl font-semibold"
            style={{ color: "#F5FAFD" }}
          >
            Admin Panel
          </h2>
          <p className="text-sm mt-1" style={{ color: "#AAB6CB" }}>
            Management Console
          </p>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-3 px-4 rounded transition-all ${
                  isActive ? "font-medium" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: isActive ? "#3C637B" : "transparent",
                  color: isActive ? "#F5FAFD" : "#D0DDEE",
                  borderLeft: isActive ? `3px solid #B3785A` : "3px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 mt-6 border-t" style={{ borderColor: "#3C637B" }}>
          <button
            onClick={logout}
            className="w-full py-3 px-4 rounded text-left transition-all hover:opacity-90"
            style={{
              backgroundColor: "rgba(179, 120, 90, 0.1)",
              color: "#B3785A",
              border: "1px solid rgba(179, 120, 90, 0.3)"
            }}
          >
            <div className="flex items-center justify-between">
              <span>Logout</span>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className="flex-1 p-8 overflow-auto"
        style={{ backgroundColor: "#F5FAFD" }}
      >
        <div 
          className="max-w-7xl mx-auto"
        >
          {/* Optional Header */}
          <div className="mb-8">
            <h1 
              className="text-2xl font-semibold"
              style={{ color: "#194C63" }}
            >
              {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
            </h1>
            <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
              Manage your application content and data
            </p>
          </div>

          {/* Content Container */}
          <div 
            className="rounded-xl p-6 shadow-sm"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;