import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validate passwords if user is trying to change password
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        setMessage({ type: "error", text: "Current password is required" });
        setLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage({ type: "error", text: "New passwords don't match" });
        setLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        setMessage({ type: "error", text: "Password must be at least 6 characters" });
        setLoading(false);
        return;
      }
    }

    const updates = { name };
    if (newPassword) {
      updates.currentPassword = currentPassword;
      updates.newPassword = newPassword;
    }

    const result = await updateProfile(updates);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setIsEditing(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } else {
      setMessage({ type: "error", text: result.message });
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  const handleLogout = () => {
    logout();
    onClose();
    window.location.href = "/login";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#EFE7DE] bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-[#F7F3EF] rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9B8D7F] hover:text-[#3F3A34] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#3F3A34] flex items-center gap-2">
            ⚙️ Profile Settings
          </h2>
          <p className="text-sm text-[#6B6258] mt-1">Manage your account information</p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Form */}
        <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-[#3F3A34] mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border transition-all ${
                isEditing
                  ? "border-[#6D5DFB] focus:outline-none focus:ring-2 focus:ring-[#6D5DFB] bg-white"
                  : "border-[#D4C4B0] bg-[#F7F3EF] text-[#6B6258]"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F3A34] mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-[#D4C4B0] bg-[#F7F3EF] text-[#9B8D7F] cursor-not-allowed"
            />
            <p className="text-xs text-[#9B8D7F] mt-1">Email cannot be changed</p>
          </div>

          {/* Password Change Section - Only show when editing */}
          {isEditing && (
            <>
              <div className="pt-4 border-t border-[#D4C4B0]">
                <p className="text-sm font-medium text-[#3F3A34] mb-3">
                  Change Password (Optional)
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-[#6B6258] mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2 rounded-lg border border-[#D4C4B0] focus:outline-none focus:ring-2 focus:ring-[#6D5DFB] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#6B6258] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 rounded-lg border border-[#D4C4B0] focus:outline-none focus:ring-2 focus:ring-[#6D5DFB] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#6B6258] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 rounded-lg border border-[#D4C4B0] focus:outline-none focus:ring-2 focus:ring-[#6D5DFB] text-sm"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 bg-[#6D5DFB] text-white rounded-lg hover:bg-[#5A4DE0] transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-[#EFE7DE] text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 font-medium border border-red-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 bg-[#EFE7DE] text-[#3F3A34] rounded-lg hover:bg-[#D4C4B0] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-2.5 bg-[#6D5DFB] text-white rounded-lg hover:bg-[#5A4DE0] transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}