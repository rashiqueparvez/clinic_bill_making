import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Stethoscope } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-cyan-600 text-white items-center justify-center p-12">

        <div className="max-w-md">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-white p-5 rounded-full">
              <Stethoscope className="text-blue-700 w-10 h-10" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                FIT PHYSIO THERAPY
              </h1>

              <p className="text-blue-100 mt-2">
                Clinic Billing & Prescription Management System
              </p>
            </div>

          </div>

          <ul className="space-y-4 text-lg">
            <li>✔ Secure Doctor Login</li>
            <li>✔ Patient Billing</li>
            <li>✔ Prescription Generation</li>
            <li>✔ Print & PDF Support</li>
            <li>✔ Patient History</li>
          </ul>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex flex-1 justify-center items-center p-6">

        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

          <div className="text-center">

            <div className="bg-blue-100 inline-flex p-5 rounded-full mb-5">
              <Stethoscope className="w-10 h-10 text-blue-700" />
            </div>

            <h2 className="text-3xl font-bold">
              Doctor Login
            </h2>

            <p className="text-gray-500 mt-2">
              Welcome back
            </p>

          </div>

          <form
            className="mt-8"
            onSubmit={handleLogin}
          >

            <input
              type="text"
              placeholder="Username"
              className="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-xl p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>

            </div>

            {error && (
              <div className="text-red-600 text-sm mt-3">
                {error}
              </div>
            )}

            <button
              className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-3 mt-6 font-semibold transition"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2026 FIT PHYSIO THERAPY
          </p>

        </div>

      </div>

    </div>
  );
}