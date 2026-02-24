import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin({ email, password });
      login(data);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5FAFD" }}>
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow-lg w-full max-w-sm"
        style={{ 
          backgroundColor: "#FFFFFF",
          border: "1px solid #D0DDEE"
        }}
      >
        <h2 
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "#194C63" }}
        >
          Admin Login
        </h2>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "#F5FAFD",
              border: "1px solid #AAB6CB",
              color: "#0C0D14"
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-7">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "#F5FAFD",
              border: "1px solid #AAB6CB",
              color: "#0C0D14"
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          className="w-full py-3 rounded font-medium transition-all hover:opacity-90"
          style={{
            backgroundColor: "#194C63",
            color: "#F5FAFD"
          }}
          type="submit"
        >
          Login
        </button>

        {/* Optional decorative elements */}
        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: "#D0DDEE" }}>
          <p className="text-sm" style={{ color: "#3C637B" }}>
            Secure admin access only
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;