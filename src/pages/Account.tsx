import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import "../pages/Account.css";
import { updateName, updatePassword } from "../api/authService";

const Account = () => {
  const { user, token, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setMessage("");

    if (name.length < 3) {
      return setMessage("❌ Name must be at least 3 characters.");
    }

    try {
      // Update name if changed
      if (name !== user.name) {
        await updateName(name, token);
        setUser({ ...user, name }); // Update local context
      }

      // Update password if set
      if (password.trim()) {
        if (password.length < 8) {
          return setMessage("❌ Password must be at least 8 characters.");
        }
        await updatePassword(password, token);
      }

      setMessage("✅ Account updated successfully.");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to update account.");
    }
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setPassword("");
    setMessage("Changes discarded.");
  };

  return (
    <div className="account-container">
      <h1>🧑‍💼 Manage Account</h1>
      <p className="intro-text">Do you want to change your credentials?</p>
      {message && <p className="status-text">{message}</p>}

      <div className="form-group">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="account-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Account;
