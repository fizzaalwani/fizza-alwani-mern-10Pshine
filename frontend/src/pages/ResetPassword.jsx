import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "../components/AuthLayout";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/reset-password", form);
      setMessage(res.data.message || "Password reset successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      console.log('RESET PASSOWRD ERROR :',err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter the OTP and choose a new password"
    >
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <input
          name="otp"
          placeholder="6-digit OTP"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <input
          name="newPassword"
          type="password"
          placeholder="New password"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-[#6D5DFB] text-white rounded-lg font-medium hover:opacity-90"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}
