import { useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { updateProfile } from "../services/profileApi";
import { updateProfile } from "../services/profileAPi";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setUser({ ...user, ...form });
    alert("Profile updated ✅");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button className="w-full bg-[#6D5DFB] text-white py-2 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
}
