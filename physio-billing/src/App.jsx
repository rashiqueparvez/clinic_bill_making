import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
              Patients Module (Coming Soon)
            </div>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
