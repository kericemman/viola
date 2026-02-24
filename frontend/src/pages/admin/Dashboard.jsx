import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { admin } = useAuth();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 
            className="text-2xl font-semibold"
            style={{ color: "#194C63" }}
          >
            Welcome, {admin?.name || "Admin"}
          </h1>
          <p className="mt-1" style={{ color: "#3C637B" }}>
            Overview of your admin dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Services Card */}
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium" style={{ color: "#748DB0" }}>
                  Total Services
                </h3>
                <p 
                  className="text-2xl font-semibold mt-2"
                  style={{ color: "#0C0D14" }}
                >
                  —
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}
              >
                <Users className="w-6 h-6" style={{ color: "#194C63" }} />
              </div>
            </div>
          </div>

          {/* Programs Card */}
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium" style={{ color: "#748DB0" }}>
                  Active Programs
                </h3>
                <p 
                  className="text-2xl font-semibold mt-2"
                  style={{ color: "#0C0D14" }}
                >
                  —
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(60, 99, 123, 0.1)" }}
              >
                <Calendar className="w-6 h-6" style={{ color: "#3C637B" }} />
              </div>
            </div>
          </div>

          {/* Bookings Card */}
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium" style={{ color: "#748DB0" }}>
                  Total Bookings
                </h3>
                <p 
                  className="text-2xl font-semibold mt-2"
                  style={{ color: "#0C0D14" }}
                >
                  —
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}
              >
                <DollarSign className="w-6 h-6" style={{ color: "#B3785A" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <h2 
            className="text-lg font-semibold mb-4"
            style={{ color: "#194C63" }}
          >
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#748DB0" }}></div>
              <p style={{ color: "#3C637B" }}>No recent activity to display</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <h2 
            className="text-lg font-semibold mb-4"
            style={{ color: "#194C63" }}
          >
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="p-4 rounded-lg text-center transition-all hover:opacity-90"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #D0DDEE",
                color: "#194C63"
              }}
            >
              Add Service
            </button>
            
            <button
              className="p-4 rounded-lg text-center transition-all hover:opacity-90"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #D0DDEE",
                color: "#194C63"
              }}
            >
              Create Program
            </button>
            
            <button
              className="p-4 rounded-lg text-center transition-all hover:opacity-90"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #D0DDEE",
                color: "#194C63"
              }}
            >
              View Bookings
            </button>
            
            <button
              className="p-4 rounded-lg text-center transition-all hover:opacity-90"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #D0DDEE",
                color: "#194C63"
              }}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;