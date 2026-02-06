import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response = await API.post("/auth/register", form);
      if (response.data.success) {
        alert("Account created ☕ Please login");
        setForm({
          name: "",
          email: "",
          password: "",
        })
      }else{
        setError("Something went wrong. Please try again later")
      }

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start writing your notes in a calm space"
    >
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full name"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-[#6D5DFB] text-white rounded-lg"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-[#6D5DFB] font-medium">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
