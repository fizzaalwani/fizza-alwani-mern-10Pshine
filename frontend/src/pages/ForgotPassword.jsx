import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "OTP sent");
      setTimeout(() => navigate("/reset-password"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="We’ll send a one-time code to reset your password"
    >
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-[#6D5DFB] text-white rounded-lg font-medium hover:opacity-90"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </AuthLayout>
  );
}
