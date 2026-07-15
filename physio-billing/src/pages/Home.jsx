import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ReceiptIndianRupee, Users, LogOut } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl p-10">

        {/* Header */}

        <div className="text-center mb-12">

          <img
            src="/logo.png"
            alt="Clinic Logo"
            className="w-24 h-24 mx-auto mb-4"
          />

          <h1 className="text-4xl font-bold text-blue-700">
            FIT PHYSIO THERAPY
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Doctor Dashboard
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <button
            onClick={() => navigate("/billing")}
            className="group bg-blue-600 hover:bg-blue-700 rounded-2xl p-10 text-white shadow-lg transition hover:scale-105"
          >

            <ReceiptIndianRupee
              size={70}
              className="mx-auto mb-5 group-hover:rotate-6 transition"
            />

            <h2 className="text-2xl font-bold">
              Billing
            </h2>

            <p className="mt-3 opacity-90">
              Generate Bills & Prescriptions
            </p>

          </button>

          <button
            onClick={() => navigate("/patients")}
            className="group bg-green-600 hover:bg-green-700 rounded-2xl p-10 text-white shadow-lg transition hover:scale-105"
          >

            <Users
              size={70}
              className="mx-auto mb-5"
            />

            <h2 className="text-2xl font-bold">
              Patients
            </h2>

            <p className="mt-3 opacity-90">
              View Patient Records
            </p>

          </button>

          <button
            onClick={handleLogout}
            className="group bg-red-600 hover:bg-red-700 rounded-2xl p-10 text-white shadow-lg transition hover:scale-105"
          >

            <LogOut
              size={70}
              className="mx-auto mb-5"
            />

            <h2 className="text-2xl font-bold">
              Logout
            </h2>

            <p className="mt-3 opacity-90">
              Secure Sign Out
            </p>

          </button>

        </div>

      </div>

    </div>
  );
}