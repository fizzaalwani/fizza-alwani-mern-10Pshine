import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";



export default function Login() {
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {fetchNotes}=useNotes()
  const {fetchUser}=useAuth()

  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      console.log("fetching notes from login")
      console.log("fetching user")
      await fetchUser()
       console.log("fetching notes")
      await fetchNotes()
      navigate('/dashboard')
      // alert("Login successful ☕");
     toast.success("Login successful ☕")

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue writing your notes"
    >
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6D5DFB]"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-[#6D5DFB] bg-[#6F4E37] text-white rounded-lg font-medium hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center mt-5">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#6D5DFB] text-[#6F4E37] font-medium">
          Sign up
        </Link>
        <Link
          to="/forgot-password"
          className="text-sm text-[#6D5DFB] text-[#6F4E37] block text-right mt-2"
        >
          Forgot password?
        </Link>

      </p>
    </AuthLayout>
  );
}
 