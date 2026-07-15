import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import InvoiceForm from "../components/InvoiceForm";

export default function Billing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition"
          >
            <ArrowLeft size={20} />
            <span>Dashboard</span>
          </button>

          {/* Clinic Name */}
          <div className="text-center flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
              FIT PHYSIO THERAPY
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Billing & Prescription
            </p>
          </div>

          {/* Empty div to balance layout on desktop */}
          <div className="hidden sm:block w-28"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-6">
        <InvoiceForm />
      </main>
    </div>
  );
}