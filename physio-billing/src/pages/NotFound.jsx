import { Link } from "react-router-dom";
import { Home, LogIn, TriangleAlert } from "lucide-react";

export default function NotFound() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 flex items-center justify-center px-4">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-blue-700 text-center py-8 px-6">

          <img
            src="/logo.png"
            alt="FIT PHYSIO THERAPY"
            className="w-24 h-24 mx-auto bg-white rounded-full p-2 shadow-lg"
          />

          <h1 className="text-3xl font-bold text-white mt-4">
            FIT PHYSIO THERAPY
          </h1>

          <p className="text-blue-100 mt-2">
            Clinic Management System
          </p>

        </div>

        {/* Body */}

        <div className="p-10 text-center">

          <TriangleAlert
            size={80}
            className="mx-auto text-red-500"
          />

          <h1 className="text-8xl font-black text-blue-700 mt-5">
            404
          </h1>

          <h2 className="text-3xl font-bold text-gray-800 mt-3">
            Page Not Found
          </h2>

          <p className="text-gray-500 mt-5 leading-7">
            The page you are looking for doesn't exist
            or may have been moved.
          </p>

          {token ? (

            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition duration-300"
            >
              <Home size={20} />
              Go to Dashboard
            </Link>

          ) : (

            <Link
              to="/login"
              className="inline-flex items-center gap-2 mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition duration-300"
            >
              <LogIn size={20} />
              Go to Login
            </Link>

          )}

        </div>

        {/* Footer */}

        <div className="border-t text-center py-4 bg-gray-50">

          <p className="text-gray-400 text-sm">
            © 2026 FIT PHYSIO THERAPY
          </p>

        </div>

      </div>

    </div>
  );
}