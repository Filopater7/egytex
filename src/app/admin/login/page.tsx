import type { Metadata } from "next";
import AdminLoginForm from "./_components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login — EgyTex",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#1C1400] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-amber-400">EGY</span>
            <span className="text-white">TEX</span>
          </h1>
          <p className="text-amber-200/70 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your admin password to continue.</p>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
